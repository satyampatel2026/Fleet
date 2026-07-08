import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Users, 
  Handshake, 
  Car, 
  UserCircle, 
  Wrench,
  TrendingUp,
  RefreshCw,
  BarChart3,
  CalendarDays
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    partners: 0,
    vehicles: 0,
    drivers: 0,
    workshops: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/admin/dashboard")
      .then((res) => {
        setStats(res.data);
        setLastUpdated(new Date());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const statCards = [
    {
      key: "users",
      label: "Total Users",
      value: stats.users,
      icon: Users,
      gradient: "from-indigo-500 to-purple-600",
      lightBg: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-700",
      trend: "+12%",
      trendUp: true,
      shadowColor: "indigo"
    },
    {
      key: "partners",
      label: "Total Partners",
      value: stats.partners,
      icon: Handshake,
      gradient: "from-emerald-500 to-teal-500",
      lightBg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      trend: "+8%",
      trendUp: true,
      shadowColor: "emerald"
    },
    {
      key: "vehicles",
      label: "Total Vehicles",
      value: stats.vehicles,
      icon: Car,
      gradient: "from-amber-500 to-orange-500",
      lightBg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      trend: "+5%",
      trendUp: true,
      shadowColor: "amber"
    },
    {
      key: "drivers",
      label: "Total Drivers",
      value: stats.drivers,
      icon: UserCircle,
      gradient: "from-rose-500 to-pink-500",
      lightBg: "bg-rose-50",
      border: "border-rose-200",
      text: "text-rose-700",
      trend: "-2%",
      trendUp: false,
      shadowColor: "rose"
    },
    {
      key: "workshops",
      label: "Workshops",
      value: stats.workshops,
      icon: Wrench,
      gradient: "from-violet-500 to-purple-500",
      lightBg: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-700",
      trend: "+15%",
      trendUp: true,
      shadowColor: "violet"
    }
  ];

  const StatSkeleton = () => (
    <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="h-4 bg-gray-200 rounded-sm w-24"></div>
          <div className="h-8 bg-gray-200 rounded-sm w-20"></div>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="h-3 bg-gray-200 rounded-sm w-16"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-purple-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-linear-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-200/50">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Real-time overview of your platform
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <span>Last updated:</span>
              <span className="font-medium text-gray-600">
                {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xs hover:shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <StatSkeleton key={i} />)
            : statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.key}
                    className={`group relative bg-white rounded-2xl p-6 border ${card.border} shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                  >
                    {/* Gradient accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${card.gradient}`}></div>
                    
                    {/* Background icon decoration */}
                    <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${card.lightBg} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                    
                    <div className="flex items-start justify-between relative z-10">
                      <div className="space-y-1">
                        <p className={`text-sm font-medium ${card.text} opacity-75`}>
                          {card.label}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 tracking-tight">
                          {card.value.toLocaleString()}
                        </p>
                      </div>
                      <div className={`p-3 rounded-xl bg-linear-to-br ${card.gradient} shadow-lg shadow-${card.shadowColor}-200/40`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Trend indicator */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 relative z-10">
                      <div className={`inline-flex items-center gap-1 text-xs font-medium ${card.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <TrendingUp className={`w-3 h-3 ${card.trendUp ? '' : 'rotate-180'}`} />
                        {card.trend}
                      </div>
                      <span className="text-xs text-gray-400">vs last month</span>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-purple-50/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                );
              })}
        </div>

        {/* Additional Section - Quick Stats / Recent Activity */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-500" />
              Quick Overview
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-purple-50 rounded-xl">
                <p className="text-2xl font-bold text-purple-700">{stats.users + stats.partners}</p>
                <p className="text-xs text-gray-500">Total Accounts</p>
              </div>
              <div className="text-center p-3 bg-emerald-50 rounded-xl">
                <p className="text-2xl font-bold text-emerald-700">{stats.vehicles + stats.drivers}</p>
                <p className="text-xs text-gray-500">Active Resources</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-xl">
                <p className="text-2xl font-bold text-amber-700">{stats.workshops}</p>
                <p className="text-xs text-gray-500">Workshops</p>
              </div>
              <div className="text-center p-3 bg-rose-50 rounded-xl">
                <p className="text-2xl font-bold text-rose-700">{Math.round((stats.drivers / stats.vehicles) * 100) || 0}%</p>
                <p className="text-xs text-gray-500">Driver Ratio</p>
              </div>
            </div>
          </div>
          
          <div className="bg-linear-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-purple-200/50">
            <h3 className="text-sm font-semibold opacity-80 mb-2"> Platform Growth</h3>
            <p className="text-3xl font-bold">{stats.users + stats.partners + stats.vehicles + stats.drivers + stats.workshops}</p>
            <p className="text-sm opacity-75 mt-1">Total ecosystem entities</p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">
                +{Math.round((stats.users + stats.partners) * 0.12)} this week
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}