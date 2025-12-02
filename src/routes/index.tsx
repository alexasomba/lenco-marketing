import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { TypingAnimation } from '@/components/ui/typing-animation'

import {
  Check,
  Phone,
  Mail,
  Shield,
  Lock,
  ShieldCheck,
  Landmark,
  Receipt,
  Send,
  PieChart,
  Tv,
  Wifi,
  Smartphone,
  ArrowRight,
  ChevronsRight,
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  CircleDollarSign,
} from 'lucide-react'

export const Route = createFileRoute('/')({ component: LencoLandingPage })

function LencoLandingPage() {
  const trustedLogos = [
    { name: 'dojah', display: 'dojah' },
    { name: 'Kippa', display: 'Kippa' },
    { name: 'hotels.ng', display: 'hotels.ng' },
    { name: 'Diplont', display: 'Diplont' },
    { name: 'MiddleBooks', display: 'MiddleBooks' },
    { name: 'Tangerine', display: 'Tangerine' },
  ]

  const faqs = [
    {
      question: 'What is Lenco?',
      answer:
        'Lenco is a digital-first fintech that makes easy to open and free banking and management for businesses and fintech startups with our 10+ different account types.',
    },
    {
      question: 'Who can open a business account?',
      answer:
        'Any registered business in Nigeria can open a Lenco business account. This includes sole proprietors, partnerships, and limited liability companies.',
    },
    {
      question: 'Is there a limit to the number of accounts I can have?',
      answer:
        'No, there is no limit. You can create multiple sub-accounts for different purposes such as payroll, operations, savings, and more.',
    },
    {
      question: 'How much does it cost to operate a Lenco account?',
      answer:
        'Opening and maintaining a Lenco account is completely free. We believe in transparent pricing with no hidden fees.',
    },
  ]

  const testimonials = [
    {
      name: 'George Odiana',
      role: 'Sole Proprietor',
      content:
        'I started my own business and I was having issues trying to open a business account. Lenco provided an easy and fast solution for my business banking needs. They have also provided me great customer service.',
    },
    {
      name: 'Femi Fasanle',
      role: 'Tech CEO',
      content:
        'We love the ease and speed at which our transfers come through to our account. The fact that we can open up to 10 accounts and set restrictions on spending for each makes Lenco a great choice for our growing company.',
    },
    {
      name: 'Modupe Mosadomi',
      role: 'Business Owner',
      content:
        "I was looking for a commercial/business finance direct, and I find what the kids with Lenco - the transaction management is priceless. My ledger is as clear as I want. It's a modern approach to use and manage expenses to a better life.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
        {/* Subtle dot pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-primary font-medium mb-4">Meet Lenco</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="text-foreground">All-in-one finance</span>
            <br />
            built for{' '}
            <TypingAnimation
              words={['Freelancers', 'Sole Traders', 'SMEs', 'Tech Startups']}
              className="text-primary"
              loop={true}
              duration={80}
              pauseDelay={2000}
              cursorStyle="line"
            />
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Bank accounts | Payments | Expense management
          </p>
          <Button size="lg" className="px-8 py-6 text-base font-semibold rounded-lg">
            Get Started in Minutes
          </Button>

          {/* Trusted By */}
          <div className="mt-16">
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by thousands of fast-growing businesses
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {trustedLogos.map((logo) => (
                <span key={logo.name} className="text-muted-foreground font-semibold text-lg tracking-wide">
                  {logo.display}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-5xl mx-auto mt-16">
          <Card className="shadow-2xl border-border overflow-hidden">
            <div className="bg-muted px-6 py-3 border-b border-border flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="ml-4 text-sm text-muted-foreground">Lenco Dashboard</span>
            </div>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <p className="text-muted-foreground text-sm mb-2">Total Available Balance</p>
                  <p className="text-4xl font-bold text-foreground mb-6">₦54,302,001.38</p>
                  <div className="grid grid-cols-4 gap-4">
                    <Card className="bg-muted/50 border-0 shadow-none">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Inflow</p>
                        <p className="font-semibold text-foreground">₦2.3M</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50 border-0 shadow-none">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Payouts</p>
                        <p className="font-semibold text-foreground">₦1.2M</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50 border-0 shadow-none">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Bill Payment</p>
                        <p className="font-semibold text-foreground">₦450K</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50 border-0 shadow-none">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Expenses</p>
                        <p className="font-semibold text-foreground">₦890K</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="bg-primary/10 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <CircleDollarSign className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">Quick Actions</span>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Money
                    </Button>
                    <Button variant="outline" className="w-full bg-background">
                      <Receipt className="w-4 h-4 mr-2" />
                      Pay Bills
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Not a Bank Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Lenco is not a bank.</span>{' '}
            <span className="text-foreground">We are better!</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Built for Startups, Sole Traders, SMBs and Freelancers.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50 relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" 
          style={{
            backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
        <div className="max-w-7xl mx-auto space-y-32 relative z-10">
          {/* Business Current Account */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Business Current Account
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Real bank accounts for fast-growing businesses. These accounts accept inflows, bank cards to deposit, online bank transfers and all forms of deposits.
              </p>
              <a href="#learn-more" className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all group">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <Card className="shadow-lg border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 group">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    Current Account
                  </CardTitle>
                  <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">Active</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Glovo Controller</p>
                    <p className="text-sm text-muted-foreground">Approved</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Acme Corp</p>
                    <p className="text-sm text-muted-foreground">Processing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pay Bills */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Card className="order-2 lg:order-1 shadow-lg border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  Bill Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <Tv className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="font-medium text-foreground">Cable TV</span>
                  </div>
                  <span className="text-muted-foreground font-medium">₦15,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <Wifi className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="font-medium text-foreground">Data Bundle</span>
                  </div>
                  <span className="text-muted-foreground font-medium">₦5,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-medium text-foreground">Monthly Bill</span>
                  </div>
                  <span className="text-muted-foreground font-medium">₦8,500</span>
                </div>
              </CardContent>
            </Card>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Pay Bills
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Create, send and manage invoices, automate payment reminders, automatic invoice reconciliation reports. Attach invoices to payments and much more.
              </p>
              <a href="#learn-more" className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all group">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Payouts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Payouts
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Make up to 5,000 payments instantly with an effort. Upload a file to make bulk payouts from file account or integrate API to automate instant payouts.
              </p>
              <a href="#learn-more" className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all group">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <Card className="shadow-lg border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  Beneficiaries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex -space-x-2">
                    {['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-amber-500', 'bg-green-500'].map((color, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full ${color} border-2 border-background flex items-center justify-center text-white text-sm font-bold shadow-sm`}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-muted-foreground text-xs font-medium">
                      +12
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Total Payouts
                    </span>
                    <span className="font-semibold text-foreground">₦12,500,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      This Month
                    </span>
                    <span className="font-semibold text-foreground">₦2,340,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expense Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Card className="order-2 lg:order-1 shadow-lg border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Marketing</span>
                      <span className="text-sm font-medium text-foreground">₦1,200,000</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Operations</span>
                      <span className="text-sm font-medium text-foreground">₦850,000</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Payroll</span>
                      <span className="text-sm font-medium text-foreground">₦2,400,000</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-full h-full bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Expense Management
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Categorize transactions for automated reconciliation with transaction category, receipt grouping and paid transaction scheduling.
              </p>
              <a href="#learn-more" className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all group">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <span className="text-foreground">Your smart business account is </span>
            <span className="text-primary">backed by</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-none bg-transparent group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Maximum Trust</h3>
                <p className="text-sm text-muted-foreground">
                  We hold your business account in a licensed bank with 24/7 access to your funds.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-none bg-transparent group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Maximum Security</h3>
                <p className="text-sm text-muted-foreground">
                  Bank-grade security with two-factor authentication, encrypted data, and access control for added security.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-none bg-transparent group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Maximum Safety</h3>
                <p className="text-sm text-muted-foreground">
                  Your money is insured by NDIC, with our institutional-grade fraud risk detection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* We are Free Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="text-green-300">We are Free.</span>
              </h2>
              <ul className="space-y-4">
                {[
                  'Free account opening',
                  'No minimum balance',
                  'No maintenance fees',
                  'Free transfers with Lenco card bank',
                  'Free 500 Monthly transfers'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-300" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                size="lg" 
                variant="secondary"
                className="mt-8 font-semibold"
              >
                Get Started in Minutes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-6">
              <Card className="bg-card text-card-foreground">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground mb-2">TotalBalance</p>
                  <p className="text-3xl font-bold text-foreground mb-6">₦1,234,567.89</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Main Account</span>
                      <span className="font-medium text-foreground">₦850,000.00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Savings</span>
                      <span className="font-medium text-foreground">₦384,567.89</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50 relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" 
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px'
          }}
        />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            <span className="text-foreground">Get started with </span>
            <span className="text-primary">Lenco</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-0 relative items-start">
            {[
              { num: '1', title: 'Sign up in a few minutes', desc: 'Quick and easy registration process' },
              { num: '2', title: 'Tell us about your business', desc: 'Provide your business details' },
              { num: '3', title: 'Verify your business and personal identity', desc: 'Complete verification process' },
              { num: '4', title: 'Your account is ready! Get started', desc: 'Start using your account' },
            ].map((step, index) => (
              <>
                <div key={index} className="relative flex flex-col items-center">
                  {/* Large Step Number */}
                  <span className="text-7xl md:text-8xl font-bold text-primary/20 mb-4 select-none">
                    {step.num}
                  </span>
                  <h3 className="font-semibold text-foreground mb-2 text-center px-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground text-center px-2">{step.desc}</p>
                </div>
                {/* Chevron connector - hidden on last item and mobile */}
                {index < 3 && (
                  <div className="hidden md:flex items-center justify-center self-start mt-8">
                    <ChevronsRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </>
            ))}
          </div>
          <Button 
            size="lg" 
            className="mt-12 font-semibold rounded-xl px-8"
          >
            Get Started in 10mins
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-foreground">A banking experience </span>
            <span className="text-primary">businesses love</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-muted/50 border-0 shadow-none hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50 relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" 
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-foreground">Take your business with you<br /></span>
                <span className="text-foreground">anywhere you go</span>
              </h2>
              <p className="text-foreground mb-2 font-semibold">Lenco business mobile app.</p>
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-md">
                Your business banking available to you on-the-go to handle everything from making and approving payments, to checking balances, seeing your business performance, sending invoices and lots more.
              </p>
              <div className="flex gap-4">
                <a 
                  href="#"
                  className="inline-flex items-center gap-3 px-5 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] leading-tight text-muted-foreground">Download on the</p>
                    <p className="font-semibold text-sm text-foreground">App Store</p>
                  </div>
                </a>
                <a 
                  href="#"
                  className="inline-flex items-center gap-3 px-5 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] leading-tight text-muted-foreground">GET IT ON</p>
                    <p className="font-semibold text-sm text-foreground">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
            {/* Two overlapping phone mockups */}
            <div className="flex justify-center lg:justify-end relative h-[500px]">
              {/* Back phone - Bill Payment screen */}
              <div className="absolute right-0 top-0 w-[220px] md:w-[260px]">
                <div className="bg-card rounded-[40px] shadow-2xl border border-border overflow-hidden">
                  {/* Phone notch area */}
                  <div className="bg-card px-6 py-2 flex justify-between items-center text-xs">
                    <span className="text-foreground font-medium">17:59</span>
                    <div className="w-20 h-6 bg-foreground rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71s.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73s3.15.25 4.6.73v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71s-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/></svg>
                    </div>
                  </div>
                  {/* Screen content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-foreground mb-4">Bill Payment</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">Buy Airtime</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                          <Wifi className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="font-medium text-foreground">Data</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <span className="font-medium text-foreground">Electricity</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <Tv className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="font-medium text-foreground">Cable TV</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="font-medium text-foreground">Cards</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Front phone - Dashboard screen */}
              <div className="absolute left-0 lg:left-auto lg:right-32 top-16 w-[220px] md:w-[260px] z-10">
                <div className="bg-card rounded-[40px] shadow-2xl border border-border overflow-hidden">
                  {/* Phone notch area */}
                  <div className="bg-card px-6 py-2 flex justify-between items-center text-xs">
                    <span className="text-foreground font-medium">17:59</span>
                    <div className="w-20 h-6 bg-foreground rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71s.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73s3.15.25 4.6.73v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71s-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/></svg>
                    </div>
                  </div>
                  {/* Screen content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-muted-foreground text-sm">Hello, <span className="text-foreground font-semibold">Oga Venue...</span></p>
                      </div>
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        Total Balance
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      </p>
                      <p className="text-2xl font-bold text-foreground">₦24,000,000</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-3">Insight for the Month</p>
                      <div className="flex justify-between mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">Money in <span className="text-green-500">✓</span></p>
                          <p className="font-semibold text-foreground">₦12,000,000</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">Money out <span className="text-red-500">↗</span></p>
                          <p className="font-semibold text-foreground">₦2,564,000</p>
                        </div>
                      </div>
                      {/* Simple chart representation */}
                      <div className="h-16 flex items-end gap-1">
                        <div className="flex-1 bg-primary/20 rounded-t" style={{height: '40%'}}></div>
                        <div className="flex-1 bg-primary/20 rounded-t" style={{height: '60%'}}></div>
                        <div className="flex-1 bg-primary/20 rounded-t" style={{height: '45%'}}></div>
                        <div className="flex-1 bg-primary/20 rounded-t" style={{height: '80%'}}></div>
                        <div className="flex-1 bg-primary/20 rounded-t" style={{height: '55%'}}></div>
                        <div className="flex-1 bg-primary/30 rounded-t" style={{height: '70%'}}></div>
                        <div className="flex-1 bg-primary/40 rounded-t" style={{height: '90%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Need to Speak to us?</h2>
              <div className="space-y-4">
                <a href="tel:+2349065211609" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span>+234 906 521 1609</span>
                </a>
                <a href="tel:+2349065211608" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span>+234 906 521 1608</span>
                </a>
                <a href="mailto:support@lenco.co" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>support@lenco.co</span>
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently asked questions</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="border border-border rounded-lg px-4 data-[state=open]:bg-muted/50"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
