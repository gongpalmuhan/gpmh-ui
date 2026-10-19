import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode
} from 'react';

type TabsContextValue = {
  baseId: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  value: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string) {
  const context = useContext(TabsContext);
  if (!context) throw new Error(`${componentName} must be used inside Tabs.`);
  return context;
}

function getValueId(value: string) {
  return encodeURIComponent(value);
}

export type TabsProps = {
  children: ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  value?: string;
};

export function Tabs({
  children,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  value: valueProp
}: TabsProps) {
  const generatedId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
  const value = valueProp ?? uncontrolledValue;

  function handleValueChange(nextValue: string) {
    if (valueProp === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <TabsContext.Provider
      value={{
        baseId: `gpmh-tabs-${generatedId}`,
        onValueChange: handleValueChange,
        orientation,
        value
      }}
    >
      <div className="gpmh-tabs" data-orientation={orientation}>{children}</div>
    </TabsContext.Provider>
  );
}

export const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function TabsList(
  { className, ...props },
  ref
) {
  const { orientation } = useTabsContext('TabsList');
  return (
    <div
      {...props}
      ref={ref}
      className={['gpmh-tabs__list', className].filter(Boolean).join(' ')}
      role="tablist"
      aria-orientation={orientation}
    />
  );
});

export type TabsTriggerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & {
  value: string;
};

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { children, className, disabled, onClick, onKeyDown, value: triggerValue, ...props },
  ref
) {
  const { baseId, onValueChange, orientation, value } = useTabsContext('TabsTrigger');
  const isSelected = value === triggerValue;
  const valueId = getValueId(triggerValue);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const previousKeys = orientation === 'horizontal' ? ['ArrowLeft'] : ['ArrowUp'];
    const nextKeys = orientation === 'horizontal' ? ['ArrowRight'] : ['ArrowDown'];
    const tabList = event.currentTarget.closest<HTMLElement>('[role="tablist"]');
    const tabs = Array.from(tabList?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? []);
    const currentIndex = tabs.indexOf(event.currentTarget);
    if (!tabs.length || currentIndex < 0) return;

    let nextIndex: number | undefined;
    if (previousKeys.includes(event.key)) nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (nextKeys.includes(event.key)) nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  }

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      className={['gpmh-tabs__trigger', className].filter(Boolean).join(' ')}
      disabled={disabled}
      id={`${baseId}-tab-${valueId}`}
      role="tab"
      aria-controls={`${baseId}-panel-${valueId}`}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onValueChange(triggerValue);
      }}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  );
});

export type TabsContentProps = HTMLAttributes<HTMLDivElement> & {
  forceMount?: boolean;
  value: string;
};

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { children, className, forceMount = false, value: contentValue, ...props },
  ref
) {
  const { baseId, value } = useTabsContext('TabsContent');
  const isSelected = value === contentValue;
  const valueId = getValueId(contentValue);
  if (!isSelected && !forceMount) return null;

  return (
    <div
      {...props}
      ref={ref}
      className={['gpmh-tabs__content', className].filter(Boolean).join(' ')}
      hidden={!isSelected}
      id={`${baseId}-panel-${valueId}`}
      role="tabpanel"
      aria-labelledby={`${baseId}-tab-${valueId}`}
      tabIndex={0}
    >
      {children}
    </div>
  );
});
