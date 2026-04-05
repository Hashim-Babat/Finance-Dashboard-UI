import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, X, Shield, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROLES, USER_PROFILE, NAV_ITEMS } from '../../utils/constants';

const navIcons = {
  dashboard: LayoutDashboard,
  transactions: ArrowLeftRight,
  insights: Lightbulb,
};

export default function Sidebar() {
  const { state, actions } = useApp();
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => actions.setSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          w-[260px]
          bg-white dark:bg-navy-800
          border-r border-cream-200 dark:border-navy-700
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${state.sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-charcoal-900 dark:text-white tracking-tight">
                Coinpath
              </h1>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-charcoal-700/40 dark:text-slate-500">
                Wealth Suite
              </span>
            </div>
            <button
              onClick={() => actions.setSidebar(false)}
              className="lg:hidden p-2 rounded-xl hover:bg-cream-100 dark:hover:bg-navy-700 text-charcoal-700 dark:text-slate-400 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(item => {
            const Icon = navIcons[item.id];
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => actions.setSidebar(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  text-sm font-medium
                  transition-all duration-200
                  group
                  ${isActive
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-charcoal-700 dark:text-slate-400 hover:bg-cream-100 dark:hover:bg-navy-700 hover:text-charcoal-900 dark:hover:text-white'
                  }
                `}
              >
                <Icon
                  size={20}
                  className={isActive ? 'text-white' : 'text-charcoal-700/50 dark:text-slate-500 group-hover:text-charcoal-800 dark:group-hover:text-slate-300'}
                />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Role Switcher */}
        <div className="px-4 py-3 border-t border-cream-200 dark:border-navy-700">
          <label className="text-[10px] font-semibold tracking-wider uppercase text-charcoal-700/40 dark:text-slate-500 mb-2 block">
            Role
          </label>
          <div className="flex rounded-xl overflow-hidden border border-cream-200 dark:border-navy-600">
            <button
              onClick={() => actions.setRole(ROLES.ADMIN)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-all cursor-pointer
                ${state.role === ROLES.ADMIN
                  ? 'bg-teal-500 text-white'
                  : 'bg-cream-50 dark:bg-navy-700 text-charcoal-700 dark:text-slate-400 hover:bg-cream-100 dark:hover:bg-navy-600'
                }
              `}
            >
              <Shield size={13} />
              Admin
            </button>
            <button
              onClick={() => actions.setRole(ROLES.VIEWER)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-all cursor-pointer
                ${state.role === ROLES.VIEWER
                  ? 'bg-teal-500 text-white'
                  : 'bg-cream-50 dark:bg-navy-700 text-charcoal-700 dark:text-slate-400 hover:bg-cream-100 dark:hover:bg-navy-600'
                }
              `}
            >
              <Eye size={13} />
              Viewer
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-cream-200 dark:border-navy-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
              {USER_PROFILE.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-charcoal-900 dark:text-white truncate">
                {USER_PROFILE.name}
              </p>
              <p className="text-xs text-charcoal-700/50 dark:text-slate-500">
                {USER_PROFILE.plan}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
