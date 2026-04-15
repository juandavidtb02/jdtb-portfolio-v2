"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { personalInfo } from "@/lib/portfolio-data"
import { useInView } from "@/hooks/use-in-view"
import { toast } from "sonner"
import { Send, MessageCircle, Mail, Check, Loader2 } from "lucide-react"

export function ContactSection() {
  const { t } = useLanguage()
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsSuccess(false)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })
      const data = await res.json()

      if (data.success) {
        setIsSuccess(true)
        setFormState({ name: "", email: "", message: "" })
        toast.success("Message sent successfully! ✉️")
        setTimeout(() => setIsSuccess(false), 4000)
      } else {
        toast.error("Failed to send message. Please try again.")
      }
    } catch {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'd like to get in touch with you.")
    window.open(`${personalInfo.whatsapp}?text=${message}`, "_blank")
  }

  const isValid =
    formState.name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email) &&
    formState.message.trim().length > 0

  return (
    <section id="contact" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 retro-grid opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-pixel)] text-xs text-neon-magenta mb-2">
            {"// "}{t("contact.subtitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-neon-cyan text-glow-cyan">{t("contact.title")}</span>
          </h2>
        </div>

        <div 
          ref={ref}
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Contact Card */}
          <div className="relative bg-card/50 backdrop-blur-sm rounded-lg border border-border p-8">
            {/* HUD corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-neon-cyan/30 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/30 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-neon-cyan/30 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-neon-cyan/30 rounded-br-lg" />

            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <Mail className="w-4 h-4 text-muted-foreground ml-2" />
              <span className="font-mono text-sm text-muted-foreground">contact.exe</span>
            </div>

            {/* Success Message */}
            {isSuccess && (
              <div className="mb-6 p-4 rounded-lg bg-neon-lime/10 border border-neon-lime/30 flex items-center gap-3 animate-fade-in-up">
                <div className="w-8 h-8 rounded-full bg-neon-lime/20 flex items-center justify-center neon-glow-lime">
                  <Check className="w-5 h-5 text-neon-lime" />
                </div>
                <span className="text-neon-lime font-medium">{t("contact.success")}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.name")}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={t("contact.namePlaceholder")}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-cyan/50" />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.email")}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder={t("contact.emailPlaceholder")}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-cyan/50" />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.message")}
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={t("contact.messagePlaceholder")}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-neon-cyan text-background font-semibold rounded-lg hover:neon-glow-cyan transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {isSubmitting ? "Sending..." : t("contact.send")}
                </button>
                
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-neon-lime/10 text-neon-lime border border-neon-lime/30 font-semibold rounded-lg hover:bg-neon-lime/20 hover:border-neon-lime/50 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t("contact.whatsapp")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

