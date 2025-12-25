'use client';

import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';

import 'flag-icons/css/flag-icons.min.css';

import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { useDebounceValue } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { FlagCode, FlagData, flagsData } from './flags-data';

interface FlagPickerProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof PopoverTrigger>,
    'onSelect' | 'onOpenChange'
  > {
  value?: FlagCode;
  defaultValue?: FlagCode;
  onValueChange?: (value: FlagCode) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  triggerPlaceholder?: string;
  flagsList?: FlagData[];
  categorized?: boolean;
  modal?: boolean;
}

const FlagRenderer = React.memo(({ flag }: { flag: FlagData }) => {
  return (
    <span
      className={`fi fi-${flag.code.toLowerCase()} h-6 w-6 rounded-sm shadow-sm`}
      title={flag.name}
    />
  );
});
FlagRenderer.displayName = 'FlagRenderer';

const FlagsColumnSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-4 w-1/2 rounded-md" />
      <div className="grid w-full grid-cols-6 gap-2">
        {Array.from({ length: 48 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-md" />
        ))}
      </div>
    </div>
  );
};

const useFlagsData = () => {
  const [flags, setFlags] = useState<FlagData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFlags = async () => {
      setIsLoading(true);
      // Simulate loading delay for consistency with icon picker
      await new Promise((resolve) => setTimeout(resolve, 10));

      if (isMounted) {
        setFlags(flagsData);
        setIsLoading(false);
      }
    };

    loadFlags();

    return () => {
      isMounted = false;
    };
  }, []);

  return { flags, isLoading };
};

const FlagPicker = React.forwardRef<
  React.ComponentRef<typeof PopoverTrigger>,
  FlagPickerProps
>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      open,
      defaultOpen,
      onOpenChange,
      children,
      searchable = true,
      searchPlaceholder = 'Search for a country...',
      triggerPlaceholder = 'Select a country',
      flagsList,
      categorized = true,
      modal = false,
      ...props
    },
    ref
  ) => {
    const [selectedFlag, setSelectedFlag] = useState<FlagCode | undefined>(
      defaultValue
    );
    const [isOpen, setIsOpen] = useState(defaultOpen || false);
    const [search, setSearch] = useDebounceValue('', 100);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const { flags } = useFlagsData();
    const [isLoading, setIsLoading] = useState(true);

    const flagsToUse = useMemo(() => flagsList || flags, [flagsList, flags]);

    const fuseInstance = useMemo(() => {
      return new Fuse(flagsToUse, {
        keys: ['name', 'code', 'continent', 'tags'],
        threshold: 0.3,
        ignoreLocation: true,
        includeScore: true,
      });
    }, [flagsToUse]);

    const filteredFlags = useMemo(() => {
      if (search.trim() === '') {
        return flagsToUse;
      }

      const results = fuseInstance.search(search.toLowerCase().trim());
      return results.map((result) => result.item);
    }, [search, flagsToUse, fuseInstance]);

    const categorizedFlags = useMemo(() => {
      if (!categorized || search.trim() !== '') {
        return [{ name: 'All Countries', flags: filteredFlags }];
      }

      const continents = new Map<string, FlagData[]>();

      filteredFlags.forEach((flag) => {
        const continent = flag.continent || 'Other';
        if (!continents.has(continent)) {
          continents.set(continent, []);
        }
        continents.get(continent)!.push(flag);
      });

      return Array.from(continents.entries())
        .map(([name, flags]) => ({ name, flags }))
        .sort((a, b) => a.name.localeCompare(b.name));
    }, [filteredFlags, categorized, search]);

    const virtualItems = useMemo(() => {
      const items: Array<{
        type: 'category' | 'row';
        categoryIndex: number;
        rowIndex?: number;
        flags?: FlagData[];
      }> = [];

      categorizedFlags.forEach((category, categoryIndex) => {
        items.push({ type: 'category', categoryIndex });

        const rows = [];
        for (let i = 0; i < category.flags.length; i += 6) {
          rows.push(category.flags.slice(i, i + 6));
        }

        rows.forEach((rowFlags, rowIndex) => {
          items.push({
            type: 'row',
            categoryIndex,
            rowIndex,
            flags: rowFlags,
          });
        });
      });

      return items;
    }, [categorizedFlags]);

    const categoryIndices = useMemo(() => {
      const indices: Record<string, number> = {};

      virtualItems.forEach((item, index) => {
        if (item.type === 'category') {
          indices[categorizedFlags[item.categoryIndex].name] = index;
        }
      });

      return indices;
    }, [virtualItems, categorizedFlags]);

    const parentRef = React.useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
      count: virtualItems.length,
      getScrollElement: () => parentRef.current,
      estimateSize: (index) =>
        virtualItems[index].type === 'category' ? 25 : 50,
      paddingEnd: 2,
      gap: 10,
      overscan: 5,
    });

    const handleValueChange = useCallback(
      (flagCode: FlagCode) => {
        if (value === undefined) {
          setSelectedFlag(flagCode);
        }
        onValueChange?.(flagCode);
      },
      [value, onValueChange]
    );

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        setSearch('');
        if (open === undefined) {
          setIsOpen(newOpen);
        }
        onOpenChange?.(newOpen);

        setIsPopoverVisible(newOpen);

        if (newOpen) {
          setTimeout(() => {
            virtualizer.measure();
            setIsLoading(false);
          }, 1);
        }
      },
      [open, onOpenChange, virtualizer, setSearch]
    );

    const handleFlagClick = useCallback(
      (flagCode: FlagCode) => {
        handleValueChange(flagCode);
        setIsOpen(false);
        setSearch('');
      },
      [handleValueChange, setSearch]
    );

    const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);

        if (parentRef.current) {
          parentRef.current.scrollTop = 0;
        }

        virtualizer.scrollToOffset(0);
      },
      [virtualizer, setSearch]
    );

    const scrollToCategory = useCallback(
      (categoryName: string) => {
        const categoryIndex = categoryIndices[categoryName];

        if (categoryIndex !== undefined && virtualizer) {
          virtualizer.scrollToIndex(categoryIndex, {
            align: 'start',
            behavior: 'smooth',
          });
        }
      },
      [categoryIndices, virtualizer]
    );

    const categoryButtons = useMemo(() => {
      if (!categorized || search.trim() !== '') return null;

      return categorizedFlags.map((category) => (
        <Button
          key={category.name}
          variant={'outline'}
          size="sm"
          className="text-xs"
          onClick={(e) => {
            e.stopPropagation();
            scrollToCategory(category.name);
          }}
        >
          {category.name}
        </Button>
      ));
    }, [categorizedFlags, scrollToCategory, categorized, search]);

    const renderFlag = useCallback(
      (flag: FlagData) => (
        <TooltipProvider key={flag.code}>
          <Tooltip>
            <TooltipTrigger
              className={cn(
                'hover:bg-foreground/10 rounded-md border p-2 transition',
                'flex items-center justify-center'
              )}
              onClick={() => handleFlagClick(flag.code as FlagCode)}
            >
              <FlagRenderer flag={flag} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{flag.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      [handleFlagClick]
    );

    const renderVirtualContent = useCallback(() => {
      if (filteredFlags.length === 0) {
        return (
          <div className="text-center text-gray-500">No country found</div>
        );
      }

      return (
        <div
          className="relative w-full overscroll-contain"
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem: VirtualItem) => {
            const item = virtualItems[virtualItem.index];

            if (!item) return null;

            const itemStyle = {
              position: 'absolute' as const,
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            };

            if (item.type === 'category') {
              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  style={itemStyle}
                >
                  <div className="text-sm font-medium text-gray-700">
                    {categorizedFlags[item.categoryIndex].name}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                style={itemStyle}
              >
                <div className="grid grid-cols-6 gap-2">
                  {item.flags?.map((flag) => renderFlag(flag))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }, [
      virtualizer,
      virtualItems,
      categorizedFlags,
      filteredFlags,
      renderFlag,
    ]);

    React.useEffect(() => {
      if (isPopoverVisible) {
        setIsLoading(true);
        const timer = setTimeout(() => {
          setIsLoading(false);
          virtualizer.measure();
        }, 10);

        const resizeObserver = new ResizeObserver(() => {
          virtualizer.measure();
        });

        if (parentRef.current) {
          resizeObserver.observe(parentRef.current);
        }

        return () => {
          clearTimeout(timer);
          resizeObserver.disconnect();
        };
      }
    }, [isPopoverVisible, virtualizer]);

    const selectedFlagData = useMemo(() => {
      const code = value || selectedFlag;
      return flagsToUse.find((flag) => flag.code === code);
    }, [value, selectedFlag, flagsToUse]);

    return (
      <Popover
        open={open ?? isOpen}
        onOpenChange={handleOpenChange}
        modal={modal}
      >
        <PopoverTrigger ref={ref} asChild {...props}>
          {children || (
            <Button variant="outline">
              {selectedFlagData ? (
                <div className="flex items-center gap-2">
                  <span
                    className={`fi fi-${selectedFlagData.code.toLowerCase()} h-4 w-4 rounded-sm`}
                    title={selectedFlagData.name}
                  />
                  <span>{selectedFlagData.name}</span>
                </div>
              ) : (
                triggerPlaceholder
              )}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-80 p-2">
          {searchable && (
            <Input
              placeholder={searchPlaceholder}
              onChange={handleSearchChange}
              className="mb-2"
            />
          )}
          {categorized && search.trim() === '' && (
            <div className="mt-2 flex flex-row gap-1 overflow-x-auto pb-2">
              {categoryButtons}
            </div>
          )}
          <div
            ref={parentRef}
            className="max-h-60 overflow-auto"
            style={{ scrollbarWidth: 'thin' }}
          >
            {isLoading ? <FlagsColumnSkeleton /> : renderVirtualContent()}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
FlagPicker.displayName = 'FlagPicker';

interface FlagProps extends React.HTMLAttributes<HTMLDivElement> {
  code: FlagCode;
}

const Flag = React.forwardRef<HTMLDivElement, FlagProps>(
  ({ code, className, ...props }, ref) => {
    const flagData = flagsData.find((flag) => flag.code === code);

    if (!flagData) {
      return null;
    }

    return (
      <span
        ref={ref}
        className={cn(
          `fi fi-${code.toLowerCase()} h-5 w-5 rounded-sm`,
          className
        )}
        title={flagData.name}
        {...props}
      />
    );
  }
);
Flag.displayName = 'Flag';

export { Flag, FlagPicker, flagsData, type FlagCode, type FlagData };
