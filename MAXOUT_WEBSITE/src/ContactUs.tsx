import { useState } from "react";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://maxout-api.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar /> {/* ✅ shared navbar */}

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 text-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800">
        <h2 className="text-5xl font-bold mb-4">
          Contact <span className="text-brand">Us</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Got questions, feedback, or ideas? We’d love to hear from you.
        </p>
      </section>

      {/* Contact Form */}
      <section className="px-6 py-16 bg-zinc-950">
        <div className="max-w-3xl mx-auto bg-zinc-900 border border-gray-700 rounded-lg shadow-glow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:border-brand focus:ring-brand"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:border-brand focus:ring-brand"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:border-brand focus:ring-brand"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-brand hover:bg-pink-600 text-white font-semibold shadow-glow transition-all"
            >
              Send Message
            </Button>

            {/* ✅ Inline feedback */}
            {status === "success" && (
              <p className="mt-4 text-green-400 text-sm">
                ✅ Thanks for reaching out! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-red-400 text-sm">
                ❌ Something went wrong. Please try again later.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-gray-800 text-center">
        <h3 className="text-2xl font-bold mb-4 text-brand">MaxOut</h3>
        <p className="text-gray-400 mb-6">
          We’re here to support your fitness journey.
        </p>
        <div className="flex gap-6 justify-center text-sm text-gray-500">
          <a href="#" className="hover:text-brand transition-colors">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" className="hover:text-brand transition-colors">
            Terms of Service
          </a>
          <span>•</span>
          <a href="/contact" className="hover:text-brand transition-colors">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}

export default ContactUs;
