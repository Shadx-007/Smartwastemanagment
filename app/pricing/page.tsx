"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for small organizations getting started with smart waste management",
    icon: Star,
    popular: false,
    features: [
      "Basic waste classification (5 categories)",
      "Dashboard access",
      "Up to 100 classifications/month",
      "Email support",
      "Basic analytics",
      "Mobile app access",
    ],
    limitations: ["No IoT sensor integration", "No blockchain tracking", "No API access", "No custom categories"],
    cta: "Get Started Free",
    href: "/signup",
  },
  {
    name: "Pro",
    price: "$99",
    period: "per month",
    description: "Advanced features for medium-sized organizations with comprehensive waste management needs",
    icon: Zap,
    popular: true,
    features: [
      "Advanced classification (15+ categories)",
      "IoT sensor integration",
      "Unlimited classifications",
      "Eco score tracking",
      "Advanced analytics & reporting",
      "Priority email & chat support",
      "Custom waste categories",
      "Carbon footprint tracking",
      "Team collaboration tools",
      "Data export capabilities",
    ],
    limitations: ["No blockchain tracking", "No API access", "No white-label options"],
    cta: "Start Pro Trial",
    href: "/signup?plan=pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "Complete solution for large organizations with full customization and enterprise support",
    icon: Crown,
    popular: false,
    features: [
      "All Pro features included",
      "Full blockchain tracking",
      "Complete API access",
      "AI chatbot integration",
      "Custom AI model training",
      "White-label solutions",
      "Dedicated account manager",
      "24/7 phone support",
      "On-premise deployment options",
      "Custom integrations",
      "SLA guarantees",
      "Advanced security features",
      "Compliance certifications",
      "Training & onboarding",
    ],
    limitations: [],
    cta: "Contact Sales",
    href: "/contact",
  },
]

const faqs = [
  {
    question: "How accurate is the waste classification?",
    answer:
      "Our AI model achieves 95% accuracy across 15+ waste categories, continuously improving through machine learning and user feedback.",
  },
  {
    question: "Can I integrate with existing waste management systems?",
    answer:
      "Yes, our platform offers comprehensive APIs and supports integration with most existing waste management infrastructure.",
  },
  {
    question: "What IoT sensors are supported?",
    answer:
      "We support weight sensors, optical cameras, capacitive sensors, infrared detectors, and custom sensor configurations.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No setup fees for Free and Pro plans. Enterprise plans include complimentary setup and onboarding services.",
  },
  {
    question: "How does blockchain tracking work?",
    answer:
      "Our blockchain system creates immutable records of waste journey from collection to processing, enabling full transparency and carbon credit verification.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. No long-term contracts required for Free and Pro plans.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-spacing bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
              Choose the Perfect Plan
              <span className="block text-primary mt-1">for Your Organization</span>
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground mb-6 leading-relaxed">
              Start free and scale as you grow. All plans include our core AI-powered waste classification technology
              with no hidden fees or long-term contracts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-spacing">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn("relative", plan.popular && "lg:-mt-4 lg:mb-4")}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 text-xs">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card
                  className={cn(
                    "h-full relative overflow-hidden pricing-card",
                    plan.popular && "border-primary shadow-xl scale-105",
                  )}
                >
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                  )}

                  <CardHeader className="text-center pb-6 relative">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center",
                        plan.popular ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-muted",
                      )}
                    >
                      <plan.icon className={cn("h-6 w-6", plan.popular ? "text-white" : "text-muted-foreground")} />
                    </div>

                    <CardTitle className="text-2xl mb-2 pricing-card-title">{plan.name}</CardTitle>
                    <div className="mb-3">
                      <span className="text-2xl lg:text-3xl font-bold">{plan.price}</span>
                      {plan.period !== "contact us" && (
                        <span className="text-muted-foreground text-sm">/{plan.period}</span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="relative">
                    <Button
                      className={cn(
                        "w-full mb-4",
                        plan.popular
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          : "",
                      )}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                        What's Included
                      </h4>
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm pricing-feature-text">{feature}</span>
                        </div>
                      ))}

                      {plan.limitations.length > 0 && (
                        <>
                          <h4 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mt-4">
                            Not Included
                          </h4>
                          {plan.limitations.map((limitation, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <X className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <span className="text-xs text-muted-foreground">{limitation}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
              Get answers to common questions about our pricing, features, and implementation process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 text-sm">{faq.question}</h3>
                    <p className="text-muted-foreground text-xs">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Start Your Sustainability Journey?</h2>
            <p className="text-base lg:text-lg mb-6 max-w-2xl mx-auto opacity-90">
              Join thousands of organizations already reducing their environmental impact with our AI-powered waste
              management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/demo">Watch Demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
