import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonSpinner from "../components/ButtonSpinner";
import sessionService from "../services/sessionService";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const API_BASE_URL = "http://localhost:8080/api/v1";

const AVATARS = [
    // Male icons
    { id: "male1", url: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png" }, // Meiliastudio
    { id: "male2", url: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png" }, // Freepik
    { id: "male3", url: "https://cdn-icons-png.flaticon.com/512/236/236832.png" },   // Freepik (young)
    { id: "male4", url: "https://cdn-icons-png.flaticon.com/512/921/921347.png" },   // Freepik (avatar)
    { id: "male5", url: "https://cdn-icons-png.flaticon.com/512/1144/1144709.png" }, // Heykiyou
  
    // Female icons
    { id: "female1", url: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png" }, // Prosymbols Premium
    { id: "female2", url: "https://cdn-icons-png.flaticon.com/512/847/847969.png" },   // Freepik (person)
    { id: "female3", url: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png" }, // popcornarts
    { id: "female4", url: "https://cdn-icons-png.flaticon.com/512/2922/2922561.png" }, // Freepik (woman)
    { id: "female5", url: "https://cdn-icons-png.flaticon.com/512/219/219969.png" },   // Freepik (avatar)
  ];
  
const JOB_ROLES = [
  "TECH_SUPPORT",
  "SOFTWARE_DEVELOPER",
  "FULL_STACK_DEVELOPER",
  "FRONTEND_DEVELOPER",
  "BACKEND_DEVELOPER",
  "DATA_SCIENTIST",
  "DEVOPS_ENGINEER",
  "PRODUCT_MANAGER",
  "UI_UX_DESIGNER",
  "QA_ENGINEER",
  "SYSTEM_ADMINISTRATOR",
  "NETWORK_ENGINEER",
  "SECURITY_ANALYST",
  "BUSINESS_ANALYST",
  "PROJECT_MANAGER",
  "OTHER"
];

function formatRole(role) {
  return role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

const UserProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    learningPreferences: "",
    avatar: AVATARS[0].id,
    dateOfBirth: "",
    currentRole: "OTHER",
    preferredWorkHoursPerDay: 8,
    customRole: "",
    age: 10,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);
  const navigate = useNavigate();

  const userId = sessionService.getCurrentUserId();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/users/${userId}/profile`);
        setProfile({
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          email: res.data.email || "",
          password: "",
          username: res.data.username || "",
          learningPreferences: res.data.learningPreferences || "",
          avatar: res.data.avatar || AVATARS[0].id,
          dateOfBirth: res.data.dateOfBirth ? res.data.dateOfBirth.split("T")[0] : "",
          currentRole: JOB_ROLES.includes(res.data.currentRole) ? res.data.currentRole : "OTHER",
          preferredWorkHoursPerDay: res.data.preferredWorkHoursPerDay || 8,
          customRole: !JOB_ROLES.includes(res.data.currentRole) ? res.data.currentRole || "" : "",
          age: res.data.age || 10,
        });
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarSelect = (id) => {
    setProfile((prev) => ({ ...prev, avatar: id }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!profile.age || profile.age < 10) {
      toast.error("Age is required and must be at least 10.");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...profile };
      if (profile.currentRole === "OTHER" && profile.customRole) {
        payload.currentRole = profile.customRole;
      }
      if (!payload.password) delete payload.password;
      delete payload.customRole;
      await axios.put(`${API_BASE_URL}/users/${userId}/profile`, payload);
      toast.success("Profile updated!");
      setEditMode(false);
    } catch (err) {
      toast.error(err.response?.data || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] dark:from-[#232526] dark:via-[#414345] dark:to-[#232526] transition-colors duration-300 px-2 py-12">
      <Header />
      <div className="mt-12 flex justify-center items-center flex-1">
        <form
          onSubmit={handleSave}
          className="relative bg-white/90 dark:bg-gray-900/90 p-8 md:p-14 rounded-3xl shadow-2xl w-full max-w-3xl border border-indigo-400 dark:border-indigo-700 transition-all duration-300 backdrop-blur-2xl"
          style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)", border: "1.5px solid rgba(255,255,255,0.18)" }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 text-xl font-bold rounded-full p-2 transition-all duration-200 bg-white/70 dark:bg-gray-900/70 shadow"
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-white tracking-tight drop-shadow">User Profile</h2>
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="flex flex-col items-center w-full md:w-1/3">
              <div className="mb-3 text-center">
                <span className="block text-lg font-semibold text-gray-800 dark:text-white">Avatar</span>
              </div>
              <img
                src={AVATARS.find(a => a.id === profile.avatar)?.url || AVATARS[0].url}
                alt="Selected avatar"
                className="w-24 h-24 object-cover rounded-full border-4 border-indigo-400 shadow-lg mb-4 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowAvatars(v => !v)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-1 px-4 rounded-full shadow transition-all duration-200 mb-2"
              >
                {showAvatars ? "Hide Avatars" : "Choose Avatar"}
              </button>
              {showAvatars && (
                <div className="flex flex-wrap gap-3 justify-center mt-2 p-2 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-inner transition-all duration-300">
                  {AVATARS.map((a) => (
                    <button
                      type="button"
                      key={a.id}
                      onClick={() => editMode && handleAvatarSelect(a.id)}
                      className={`rounded-full border-2 p-1 transition-all duration-200 ${profile.avatar === a.id ? "border-blue-500 scale-110" : "border-transparent"} ${!editMode ? "opacity-60 cursor-not-allowed" : ""}`}
                      disabled={!editMode}
                    >
                      <img
                        src={a.url}
                        alt={a.id}
                        className="w-14 h-14 object-cover rounded-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 w-full mt-8 md:mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200"
                    required
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Last Name <span className="text-xs text-gray-400">(optional)</span></label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200"
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200"
                    required
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleChange}
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200"
                    placeholder={editMode ? "Enter new password" : "********"}
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200"
                    required
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Learning Preferences</label>
                  <input
                    type="text"
                    name="learningPreferences"
                    value={profile.learningPreferences}
                    onChange={handleChange}
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200"
                    placeholder="e.g. Visual, Auditory, Hands-on"
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Age <span className="text-xs text-red-500">*</span></label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    min={10}
                    className="shadow appearance-none border border-indigo-300 dark:border-indigo-600 rounded-xl w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200"
                    required
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Current Profession</label>
                  <select
                    name="currentRole"
                    value={profile.currentRole}
                    onChange={e => setProfile(p => ({ ...p, currentRole: e.target.value, customRole: "" }))}
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200"
                    disabled={!editMode}
                  >
                    {JOB_ROLES.map((role) => (
                      <option key={role} value={role}>{formatRole(role)}</option>
                    ))}
                    <option value="OTHER">Other</option>
                  </select>
                  {editMode && profile.currentRole === "OTHER" && (
                    <input
                      type="text"
                      name="customRole"
                      value={profile.customRole}
                      onChange={e => setProfile(p => ({ ...p, customRole: e.target.value }))}
                      className="mt-2 shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200"
                      placeholder="Enter your profession"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Work Hours/Day</label>
                  <input
                    type="number"
                    name="preferredWorkHoursPerDay"
                    value={profile.preferredWorkHoursPerDay}
                    onChange={handleChange}
                    min={1}
                    max={24}
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200"
                    disabled={!editMode}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="my-8 border-gray-300 dark:border-gray-700" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
            <button
              type="button"
              onClick={() => setEditMode((e) => !e)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 w-full md:w-auto"
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
            {editMode && (
              <button
                type="submit"
                disabled={saving}
                className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white font-bold py-2 px-6 rounded-lg shadow focus:outline-none focus:shadow-outline transition duration-200 w-full md:w-auto"
              >
                {saving ? <ButtonSpinner /> : "Save Changes"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile; 