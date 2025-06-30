import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  ArrowLeft,
  Target,
  Bell,
  Home,
  Hash,
  Settings,
  Crown,
  MoreVertical,
  MessageCircle,
  Calendar,
  FileText,
  Star,
  UserPlus,
  Shield,
  Zap,
  TrendingUp,
  Activity,
  Code,
  Palette,
  HelpCircle
} from "lucide-react";
import MenuDropdown from "../components/MenuDropdown";

const Teams = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock teams data with more details
  const teams = [
    {
      id: 1,
      name: "React Development Team",
      members: 8,
      activeProjects: 3,
      lastActivity: "2 hours ago",
      avatar: "🚀",
      category: "development",
      description: "Building amazing React applications",
      channels: ["general", "frontend", "backend", "deployment"],
      onlineMembers: 5,
      isFavorite: true,
      role: "admin"
    },
    {
      id: 2,
      name: "Design Squad",
      members: 5,
      activeProjects: 2,
      lastActivity: "1 day ago",
      avatar: "🎨",
      category: "design",
      description: "Creating beautiful user experiences",
      channels: ["general", "ui-design", "ux-research", "prototypes"],
      onlineMembers: 3,
      isFavorite: false,
      role: "member"
    },
    {
      id: 3,
      name: "Marketing Masters",
      members: 12,
      activeProjects: 4,
      lastActivity: "30 minutes ago",
      avatar: "📈",
      category: "marketing",
      description: "Driving growth through strategic marketing",
      channels: ["general", "campaigns", "analytics", "social-media"],
      onlineMembers: 8,
      isFavorite: true,
      role: "moderator"
    },
    {
      id: 4,
      name: "Product Pioneers",
      members: 6,
      activeProjects: 2,
      lastActivity: "3 hours ago",
      avatar: "💡",
      category: "product",
      description: "Innovating product solutions",
      channels: ["general", "roadmap", "feedback", "releases"],
      onlineMembers: 4,
      isFavorite: false,
      role: "member"
    },
    {
      id: 5,
      name: "Data Science Team",
      members: 7,
      activeProjects: 3,
      lastActivity: "5 hours ago",
      avatar: "🧠",
      category: "development",
      description: "Unlocking insights through data",
      channels: ["general", "ml-models", "data-pipeline", "research"],
      onlineMembers: 2,
      isFavorite: false,
      role: "member"
    },
    {
      id: 6,
      name: "Customer Success",
      members: 9,
      activeProjects: 1,
      lastActivity: "1 hour ago",
      avatar: "🎯",
      category: "support",
      description: "Ensuring customer satisfaction",
      channels: ["general", "support-tickets", "feedback", "onboarding"],
      onlineMembers: 6,
      isFavorite: false,
      role: "member"
    }
  ];

  const filters = [
    { id: "all", name: "All Teams", icon: Users },
    { id: "development", name: "Development", icon: Code },
    { id: "design", name: "Design", icon: Palette },
    { id: "marketing", name: "Marketing", icon: TrendingUp },
    { id: "product", name: "Product", icon: Target },
    { id: "support", name: "Support", icon: HelpCircle }
  ];

  const filteredTeams = teams.filter(team => 
    (selectedFilter === "all" || team.category === selectedFilter) &&
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown size={12} className="text-yellow-500" />;
      case 'moderator': return <Shield size={12} className="text-blue-500" />;
      default: return null;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-yellow-600 dark:text-yellow-400';
      case 'moderator': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex">
      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-80'
      } flex-shrink-0`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </div>
                <h2 className="font-semibold text-gray-900 dark:text-white">Teams</h2>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Search */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          </div>
        )}

        {/* Filters */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              {filters.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedFilter === filter.id 
                        ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent size={16} />
                    <span>{filter.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Teams List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {filteredTeams.map((team) => (
              <button
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                  selectedTeam?.id === team.id
                    ? 'bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-lg shadow-sm">
                    {team.avatar}
                  </div>
                  {team.isFavorite && (
                    <Star size={12} className="absolute -top-1 -right-1 text-yellow-500 fill-current" />
                  )}
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {team.name}
                      </h3>
                      {getRoleIcon(team.role)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{team.onlineMembers} online</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Create Team Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm">
            <Plus size={16} />
            {!sidebarCollapsed && <span>Create Team</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
              {selectedTeam ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
                    {selectedTeam.avatar}
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedTeam.name}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedTeam.members} members • {selectedTeam.onlineMembers} online
                    </p>
                  </div>
                </div>
              ) : (
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Select a team to get started
                </h1>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/landing")} 
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Home size={20} />
              </button>
              <button 
                onClick={() => navigate("/goal-set")} 
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Target size={20} />
              </button>
              <MenuDropdown />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {selectedTeam ? (
            <div className="p-6">
              {/* Team Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Team Info Card */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedTeam.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {selectedTeam.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`font-medium ${getRoleColor(selectedTeam.role)}`}>
                          {getRoleIcon(selectedTeam.role)}
                          <span className="ml-1 capitalize">{selectedTeam.role}</span>
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          Last active: {selectedTeam.lastActivity}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Settings size={20} className="text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {selectedTeam.activeProjects}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">Active Projects</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {selectedTeam.onlineMembers}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Online Now</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {selectedTeam.channels.length}
                      </div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">Channels</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <MessageCircle size={20} className="text-indigo-600" />
                      <span className="text-gray-700 dark:text-gray-300">Start Chat</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Calendar size={20} className="text-green-600" />
                      <span className="text-gray-700 dark:text-gray-300">Schedule Meeting</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <FileText size={20} className="text-blue-600" />
                      <span className="text-gray-700 dark:text-gray-300">View Documents</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <UserPlus size={20} className="text-purple-600" />
                      <span className="text-gray-700 dark:text-gray-300">Invite Members</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Channels */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Channels
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedTeam.channels.map((channel, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
                      <Hash size={16} className="text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {channel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to Teams
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  Select a team from the sidebar to view details, manage members, and collaborate on projects.
                </p>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 mx-auto">
                  <Plus size={18} />
                  Create Your First Team
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Teams; 