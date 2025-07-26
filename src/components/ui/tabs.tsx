"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const listRef = React.useRef<React.ElementRef<typeof TabsPrimitive.List>>(null);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const activeTrigger = list.querySelector<HTMLButtonElement>('[data-state="active"]');
    if (activeTrigger) {
      const { offsetLeft, offsetWidth } = activeTrigger;
      list.style.setProperty('--active-tab-left', `${offsetLeft}px`);
      list.style.setProperty('--active-tab-width', `${offsetWidth}px`);
    }

    const triggers = Array.from(list.querySelectorAll<HTMLButtonElement>('button'));
    const handleClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLButtonElement;
      const { offsetLeft, offsetWidth } = target;
      list.style.setProperty('--active-tab-left', `${offsetLeft}px`);
      list.style.setProperty('--active-tab-width', `${offsetWidth}px`);
    };

    triggers.forEach(trigger => {
      trigger.addEventListener('click', handleClick);
    });

    return () => {
      triggers.forEach(trigger => {
        trigger.removeEventListener('click', handleClick);
      });
    };
  }, []);


  return (
    <TabsPrimitive.List
      ref={(node) => {
        if (typeof ref === 'function') ref(node);
        (listRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn(
        "relative inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        "after:absolute after:bottom-1 after:left-0 after:h-[calc(100%-0.5rem)] after:rounded-sm after:bg-background after:shadow-sm after:transition-all after:duration-300 after:ease-in-out",
        "after:left-[var(--active-tab-left,0px)] after:w-[var(--active-tab-width,0px)]",
        className
      )}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "z-10 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
