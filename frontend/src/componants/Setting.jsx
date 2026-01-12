import { LogOut, Camera, User, Mail, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Setting() {
  const navigate = useNavigate();
  const { user, setUser, checkAuth } = useAuth();

  const [imgLoading, setImgLoading] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);

  const [picture, setPicture] = useState(null);
  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({ fullname: user.name, email: user.email });
      setPicture(user.ProfilePicture);
    }
  }, [user]);

  /* ---------------- HANDLERS (UNCHANGED) ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((pre) => ({ ...pre, [name]: value }));
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfileInfo = async () => {
    try {
      setUpdateProfile(true);
      let res = await fetch("http://localhost:3000/api/auth/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        toast.success("Profile updated successfully");
        checkAuth();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateProfile(false);
    }
  };

  const updateProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      setImgLoading(true);
      let res = await fetch("http://localhost:3000/api/auth/update-profile-picture", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      res = await res.json();
      setPicture(res.image);
      checkAuth();
    } catch (error) {
      console.log(error);
    } finally {
      setImgLoading(false);
    }
  };

  /* ---------------- UPGRADED UI ---------------- */
  return (
    <div className="flex-1 lg:ml-64 p-8 bg-[var(--bg-main)] min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
            Account Settings
          </h1>
          <p className="text-[var(--text-main)]/60 font-medium mt-1">
            Update your profile and security preferences.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 h-12 px-6 rounded-2xl bg-white border border-red-100 text-red-500 font-bold shadow-sm hover:bg-red-50 transition-all active:scale-95"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-6xl">
        
        {/* LEFT COLUMN: AVATAR CARD */}
        <div className="xl:col-span-1">
          <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 shadow-xl flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] border-4 border-white shadow-lg overflow-hidden bg-white transition-transform group-hover:scale-[1.02]">
                {imgLoading ? (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--bg-muted)]/20 animate-pulse">
                    <div className="w-8 h-8 border-4 border-[var(--accent-main)] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <img
                    src={picture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                )}
              </div>
              
              <input
                type="file"
                id="profileImg"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) updateProfilePicture(file);
                }}
              />
              
              <label
                htmlFor="profileImg"
                className="absolute -bottom-2 -right-2 p-3 bg-[var(--accent-main)] text-white rounded-2xl shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all"
              >
                <Camera size={20} />
              </label>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-[var(--text-main)]">{profile.fullname || "User Name"}</h3>
              <p className="text-sm font-medium text-[var(--text-main)]/50">{profile.email}</p>
            </div>

            <div className="w-full mt-8 pt-8 border-t border-black/5 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                <ShieldCheck size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Verified Account</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FORM CARD */}
        <div className="xl:col-span-2">
          <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-10 shadow-xl">
            <div className="mb-10 flex items-center gap-4">
              <div className="p-3 bg-[var(--accent-soft)]/20 rounded-2xl text-[var(--accent-main)]">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[var(--text-main)]">Personal Details</h2>
                <p className="text-sm font-medium text-[var(--text-main)]/40 uppercase tracking-widest">Update your identity</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-main)]/40 ml-1">
                    <User size={14} className="opacity-40" /> Full Name
                  </label>
                  <input
                    name="fullname"
                    value={profile.fullname}
                    onChange={handleChange}
                    className="w-full h-14 rounded-2xl bg-white/70 border border-white/40 px-5 font-bold text-[var(--text-main)] focus:ring-4 focus:ring-[var(--accent-soft)]/20 focus:bg-white outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-main)]/40 ml-1">
                    <Mail size={14} className="opacity-40" /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full h-14 rounded-2xl bg-white/70 border border-white/40 px-5 font-bold text-[var(--text-main)] focus:ring-4 focus:ring-[var(--accent-soft)]/20 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-main)]/40 ml-1">
                  <FileText size={14} className="opacity-40" /> Bio / Description
                </label>
                <textarea
                  placeholder="Share a little bit about yourself..."
                  className="w-full h-32 rounded-3xl bg-white/70 border border-white/40 p-5 font-medium text-[var(--text-main)] focus:ring-4 focus:ring-[var(--accent-soft)]/20 focus:bg-white outline-none transition-all resize-none shadow-inner"
                />
              </div>

              <div className="pt-6 border-t border-black/5 flex justify-end">
                <button
                  onClick={updateProfileInfo}
                  disabled={updateProfile}
                  className={`h-14 px-10 rounded-[1.25rem] font-black text-sm uppercase tracking-widest text-white transition-all shadow-lg
                    ${
                      updateProfile
                        ? "bg-gray-300 cursor-not-allowed shadow-none"
                        : "bg-[var(--accent-main)] shadow-[var(--accent-main)]/20 hover:scale-[1.02] active:scale-95"
                    }`}
                >
                  {updateProfile ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={18} />
                      Save Changes
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;