import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { authedPost } from "../lib/api";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"menu" | "bug" | "contact" | "faq" | "success">("menu");
  const [typing, setTyping] = useState(false);
  const [bugText, setBugText] = useState("");
  const [menuPrompt, setMenuPrompt] = useState<"greeting" | "followup">("greeting");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [error, setError] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // ===== Bug flow =====
  const handleBugClick = () => {
    setTyping(true);
    setMode("bug");
    setTimeout(() => setTyping(false), 1500);
  };

  const sendBugReport = async () => {
    if (!bugText.trim()) return;
    try {
      await authedPost("/chatbot/report", {
        type: "bug",
        message: bugText,
      });
      setBugText("");
      setMode("success");

      setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setMode("menu");
          setMenuPrompt("followup");
        }, 1500);
      }, 1500);
    } catch (err) {
      console.error("Failed to send bug report:", err);
      alert("❌ Failed to send report.");
    }
  };

  // ===== Contact & Support flow =====
  const handleContactClick = () => {
    setTyping(true);
    setMode("contact");
    setTimeout(() => setTyping(false), 1500);
  };

  const sendContactSupport = async () => {
    setError("");
    if (!contactName.trim() || contactName.trim().length < 2) {
      setError("Please enter a valid name (at least 2 characters).");
      return;
    }
    const phoneRegex = /^[+]?[0-9]{7,15}$/;
    if (!phoneRegex.test(contactPhone.trim())) {
      setError("Please enter a valid phone number (7–15 digits, digits only or with +).");
      return;
    }

    try {
      await authedPost("/chatbot/log", {
        sessionId: "support-" + Date.now(),
        messages: [
          { role: "user", text: `Name: ${contactName}, Phone: ${contactPhone}` },
          { role: "bot", text: "Contact & Support request submitted" },
        ],
      });

      setContactName("");
      setContactPhone("");
      setMode("success");

      setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setMode("menu");
          setMenuPrompt("followup");
        }, 1500);
      }, 1500);
    } catch (err) {
      console.error("Failed to send contact support:", err);
      setError("❌ Failed to send contact info.");
    }
  };

  // ===== FAQ flow =====
  const handleFaqClick = () => {
    setTyping(true);
    setMode("faq");
    setTimeout(() => setTyping(false), 1500);
  };

  const faqItems = [
    {
      q: "Where can I track my progress?",
      a: "Download the app to track progress and for more features.",
    },
    {
      q: "Does MaxOut have a gym?",
      a: "No currently, MaxOut is an online-only platform.",
    },
    {
      q: "Can I use the app offline?",
      a: "Yes, MaxOut supports offline mode with automatic sync when you're back online.",
    },
    {
      q: "Which languages are supported?",
      a: "Currently English, Zulu, and Afrikaans are supported in the mobile app.",
    },
  ];

  // ===== Close chat resets to greeting =====
  const closeChat = () => {
    setOpen(false);
    setMode("menu");
    setMenuPrompt("greeting");
    setError("");
    setOpenFaqIndex(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-72 bg-zinc-900 border border-gray-700 rounded-lg shadow-glow p-4 text-white">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-brand">MaxOut Bot</h4>
            <button
              onClick={closeChat}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu */}
          {mode === "menu" && (
            <>
              <p className="text-sm mb-4">
                {menuPrompt === "greeting"
                  ? "Hello 👋, how can I help? Please select from the menu below."
                  : "Anything else I can help you with? Please select from the menu below."}
              </p>
              <ul className="space-y-2 text-sm">
                <li
                  className="px-3 py-2 bg-zinc-800 rounded-md hover:bg-brand cursor-pointer"
                  onClick={handleContactClick}
                >
                  📞 Contact & Support
                </li>
                <li
                  className="px-3 py-2 bg-zinc-800 rounded-md hover:bg-brand cursor-pointer"
                  onClick={handleBugClick}
                >
                  ❗ Report a Bug
                </li>
                <li
                  className="px-3 py-2 bg-zinc-800 rounded-md hover:bg-brand cursor-pointer"
                  onClick={handleFaqClick}
                >
                  ℹ️ FAQ
                </li>
                <li
                  className="px-3 py-2 bg-zinc-800 rounded-md hover:bg-brand cursor-pointer"
                  onClick={() => alert("Download link coming soon...")}
                >
                  📥 Download the App
                </li>
              </ul>
            </>
          )}

          {/* Bug report */}
          {mode === "bug" && (
            <div className="space-y-3 text-sm">
              {typing ? (
                <p className="italic text-gray-400">Bot is typing...</p>
              ) : (
                <>
                  <p>Please report the bug below:</p>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={bugText}
                      onChange={(e) => setBugText(e.target.value)}
                      placeholder="Describe the bug..."
                      className="flex-1 px-2 py-1 rounded bg-black border border-gray-700 text-white focus:border-brand focus:ring-brand"
                    />
                    <button
                      onClick={sendBugReport}
                      className="px-3 py-1 rounded bg-brand hover:bg-pink-600 text-white"
                    >
                      Send
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Contact & Support */}
          {mode === "contact" && (
            <div className="space-y-3 text-sm">
              {typing ? (
                <p className="italic text-gray-400">Bot is typing...</p>
              ) : (
                <>
                  <p>Please enter your name and phone number:</p>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-2 py-1 rounded bg-black border border-gray-700 text-white focus:border-brand focus:ring-brand"
                  />
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="w-full px-2 py-1 rounded bg-black border border-gray-700 text-white focus:border-brand focus:ring-brand"
                  />
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <button
                    onClick={sendContactSupport}
                    className="w-full px-3 py-1 rounded bg-brand hover:bg-pink-600 text-white"
                  >
                    Send
                  </button>
                </>
              )}
            </div>
          )}

          {/* FAQ */}
          {mode === "faq" && (
            <div className="space-y-3 text-sm">
              {typing ? (
                <p className="italic text-gray-400">Bot is typing...</p>
              ) : (
                <>
                  <p className="mb-2">Frequently Asked Questions:</p>
                  {faqItems.map((item, idx) => (
                    <div key={idx} className="border border-gray-700 rounded-md">
                                            <button
                        onClick={() =>
                          setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                        }
                        className="w-full text-left px-3 py-2 bg-zinc-800 hover:bg-brand rounded-md"
                      >
                        {item.q}
                      </button>
                      {openFaqIndex === idx && (
                        <p className="px-3 py-2 text-gray-300 bg-zinc-900 border-t border-gray-700">
                          {item.a}
                        </p>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setMode("menu");
                      setMenuPrompt("followup");
                      setOpenFaqIndex(null);
                    }}
                    className="mt-3 w-full px-3 py-2 rounded bg-brand hover:bg-pink-600 text-white"
                  >
                    Back to Menu
                  </button>
                </>
              )}
            </div>
          )}

          {/* Success message */}
          {mode === "success" && (
            <p className="text-green-400">✅ An agent will contact you shortly.</p>
          )}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-brand text-white p-3 rounded-full shadow-glow hover:bg-pink-600 transition-all"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default Chatbot;




