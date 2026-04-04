import { Menu, Bell, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ThemeToggle from '../common/ThemeToggle';
import Badge from '../common/Badge';
import { getGreeting, getFormattedToday, getCurrentQuarter } from '../../utils/formatters';
import { USER_PROFILE, ROLES } from '../../utils/constants';
import { useState } from 'react';

export default function Header() {
  const { state, actions } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const firstName = USER_PROFILE.name.split(' ')[0];

  return (
    <header className="sticky top-0 z-30 bg-cream-50/80 dark:bg-navy-800/80 backdrop-blur-xl border-b border-cream-200/50 dark:border-navy-700/50">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px]">
        {/* Left: Hamburger + Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => actions.toggleSidebar()}
            className="lg:hidden p-2 rounded-xl hover:bg-cream-100 dark:hover:bg-navy-700 text-charcoal-700 dark:text-slate-400 transition-colors cursor-pointer"
          >
            <Menu size={22} />
          </button>

          <div className="hidden sm:block">
            <h2 className="text-lg sm:text-xl font-semibold text-charcoal-900 dark:text-white">
              {getGreeting()}, {firstName}
            </h2>
            <p className="text-xs text-charcoal-700/50 dark:text-slate-500">
              {getFormattedToday()} · {getCurrentQuarter()}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role Badge */}
          {state.role === ROLES.VIEWER && (
            <Badge color="amber" size="xs" className="hidden sm:inline-flex">
              View Only
            </Badge>
          )}

          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="
              flex items-center gap-2 px-3 py-2 rounded-xl
              bg-cream-100 dark:bg-navy-700
              hover:bg-cream-200 dark:hover:bg-navy-600
              text-charcoal-700/50 dark:text-slate-500
              text-sm transition-all cursor-pointer
              border border-cream-200 dark:border-navy-600
            "
          >
            <Search size={15} />
            <span className="hidden sm:inline">Search</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl bg-cream-100 dark:bg-navy-700 hover:bg-cream-200 dark:hover:bg-navy-600 text-charcoal-700 dark:text-slate-400 transition-colors cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral-500 rounded-full" />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
