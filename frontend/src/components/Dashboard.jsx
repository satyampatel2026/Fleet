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
  CalendarDays,
  Edit,
  Trash2,
  ChevronRight
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
  const [userList, setUserList] = useState([]);
  const [partnerList, setPartnerList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    setLoading(true);
    setError(null);

    axios
      .get("http://localhost:3000/api/admin/dashboard")
      .then((res) => {
        setStats(prev => ({
          ...prev,
          users: res.data.total_users || 0,
          partners: res.data.total_partners || 0
        }));
        
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
        setLoading(false);
      });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Add delete API call here
      console.log('Delete user:', userId);
    }
  };

  const handleDeletePartner = (partnerId) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      // Add delete API call here
      console.log('Delete partner:', partnerId);
    }
  };

  const statCards = [
    {
      key: "users",
      label: "Total Fleet Owners",
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
      label: "Total Workshop Partners",
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
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-200/50">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
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

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
              ✕
            </button>
          </div>
        )}

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
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`}></div>
                    
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
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg shadow-${card.shadowColor}-200/40`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>            

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-50/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                );
              })}
        </div>

        {/* Additional Section - Quick Stats */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
          
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-purple-200/50">
            <h3 className="text-sm font-semibold opacity-80 mb-2">Platform Growth</h3>
            <p className="text-3xl font-bold">
              {stats.users + stats.partners + stats.vehicles + stats.drivers + stats.workshops}
            </p>
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