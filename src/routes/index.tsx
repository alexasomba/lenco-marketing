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
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  CircleDollarSign,
  Apple,
  Play,
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
      name: 'George Ofoma',
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-600 font-medium mb-4">Meet Lenco</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            All-in-one finance
            <br />
            built for{' '}
            <TypingAnimation
              words={['Freelancers', 'Sole Traders', 'SMEs', 'Tech Startups']}
              className="text-blue-600"
              loop={true}
              duration={80}
              pauseDelay={2000}
              cursorStyle="line"
            />
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Bank accounts | Payments | Expense management
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold rounded-lg">
            Get Started in Minutes
          </Button>

          {/* Trusted By */}
          <div className="mt-16">
            <p className="text-sm text-gray-500 mb-6">
              Trusted by thousands of fast-growing businesses
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {trustedLogos.map((logo) => (
                <span key={logo.name} className="text-gray-400 font-semibold text-lg tracking-wide">
                  {logo.display}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-5xl mx-auto mt-16">
          <Card className="shadow-2xl border-gray-200 overflow-hidden">
            <div className="bg-slate-100 px-6 py-3 border-b border-gray-200 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="ml-4 text-sm text-gray-500">Lenco Dashboard</span>
            </div>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <p className="text-gray-500 text-sm mb-2">Total Available Balance</p>
                  <p className="text-4xl font-bold text-gray-900 mb-6">₦54,302,001.38</p>
                  <div className="grid grid-cols-4 gap-4">
                    <Card className="bg-slate-50 border-0 shadow-none">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Inflow</p>
                        <p className="font-semibold text-gray-900">₦2.3M</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50 border-0 shadow-none">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Payouts</p>
                        <p className="font-semibold text-gray-900">₦1.2M</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50 border-0 shadow-none">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Bill Payment</p>
                        <p className="font-semibold text-gray-900">₦450K</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50 border-0 shadow-none">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Expenses</p>
                        <p className="font-semibold text-gray-900">₦890K</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <CircleDollarSign className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Quick Actions</span>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4 mr-2" />
                      Send Money
                    </Button>
                    <Button variant="outline" className="w-full bg-white">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lenco is not a bank. We are better!
          </h2>
          <p className="text-gray-600 text-lg">
            Built for Startups, Sole Traders, SMBs and Freelancers.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Business Current Account */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Business Current Account
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Real bank accounts for fast-growing businesses. These accounts accept inflows, bank cards to deposit, online bank transfers and all forms of deposits.
              </p>
              <a href="#learn-more" className="text-blue-600 font-medium inline-flex items-center gap-2 hover:gap-3 transition-all group">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <Card className="shadow-lg border-gray-100">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-blue-600" />
                    Current Account
                  </CardTitle>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Active</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Glovo Controller</p>
                    <p className="text-sm text-gray-500">Approved</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Acme Corp</p>
                    <p className="text-sm text-gray-500">Processing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pay Bills */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Card className="order-2 lg:order-1 shadow-lg border-gray-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-blue-600" />
                  Bill Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <Tv className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="font-medium">Cable TV</span>
                  </div>
                  <span className="text-gray-600 font-medium">₦15,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Wifi className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="font-medium">Data Bundle</span>
                  </div>
                  <span className="text-gray-600 font-medium">₦5,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-medium">Monthly Bill</span>
                  </div>
                  <span className="text-gray-600 font-medium">₦8,500</span>
                </div>
              </CardContent>
            </Card>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Pay Bills
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Create, send and manage invoices, automate payment reminders, automatic invoice reconciliation reports. Attach invoices to payments and much more.
              </p>
              <a href="#learn-more" className="text-blue-600 font-medium inline-flex items-center gap-2 hover:gap-3 transition-all group">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Payouts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Payouts
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Make up to 5,000 payments instantly with an effort. Upload a file to make bulk payouts from file account or integrate API to automate instant payouts.
              </p>
              <a href="#learn-more" className="text-blue-600 font-medium inline-flex items-center gap-2 hover:gap-3 transition-all group">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <Card className="shadow-lg border-gray-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Beneficiaries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex -space-x-2">
                    {['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-amber-500', 'bg-green-500'].map((color, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-sm`}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium">
                      +12
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-gray-500 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Total Payouts
                    </span>
                    <span className="font-semibold text-gray-900">₦12,500,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-gray-500 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      This Month
                    </span>
                    <span className="font-semibold text-gray-900">₦2,340,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expense Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Card className="order-2 lg:order-1 shadow-lg border-gray-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-blue-600" />
                  Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">Marketing</span>
                      <span className="text-sm font-medium">₦1,200,000</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">Operations</span>
                      <span className="text-sm font-medium">₦850,000</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">Payroll</span>
                      <span className="text-sm font-medium">₦2,400,000</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Expense Management
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Categorize transactions for automated reconciliation with transaction category, receipt grouping and paid transaction scheduling.
              </p>
              <a href="#learn-more" className="text-blue-600 font-medium inline-flex items-center gap-2 hover:gap-3 transition-all group">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Your smart business account is backed by
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-none bg-transparent">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Maximum Trust</h3>
                <p className="text-sm text-gray-600">
                  We hold your business account in a licensed bank with 24/7 access to your funds.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-none bg-transparent">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Maximum Security</h3>
                <p className="text-sm text-gray-600">
                  Bank-grade security with two-factor authentication, encrypted data, and access control for added security.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-none bg-transparent">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Maximum Safety</h3>
                <p className="text-sm text-gray-600">
                  Your money is insured by NDIC, with our institutional-grade fraud risk detection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* We are Free Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                We are Free.
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
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                size="lg" 
                className="mt-8 bg-white text-blue-900 hover:bg-gray-100 font-semibold"
              >
                Get Started in Minutes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <Card className="bg-white text-gray-900">
                <CardContent className="p-5">
                  <p className="text-sm text-gray-500 mb-2">TotalBalance</p>
                  <p className="text-3xl font-bold mb-6">₦1,234,567.89</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-gray-500">Main Account</span>
                      <span className="font-medium">₦850,000.00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-gray-500">Savings</span>
                      <span className="font-medium">₦384,567.89</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
            Get started with Lenco
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-blue-200"></div>
            
            {[
              { num: '1', title: 'Sign up in few minutes', desc: 'Quick and easy registration process' },
              { num: '2', title: 'Tell us about your business', desc: 'Provide your business details' },
              { num: '3', title: 'Verify your business and personal identity', desc: 'Complete verification process' },
              { num: '4', title: 'Get approved in mere seconds. Get Started', desc: 'Start using your account' },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-2xl font-bold text-blue-600">{step.num}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
          <Button 
            size="lg" 
            className="mt-12 bg-blue-600 hover:bg-blue-700 font-semibold"
          >
            Get Started Online
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            A banking experience businesses love
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-50 border-0 shadow-none">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Take your business with you anywhere you go
              </h2>
              <p className="text-gray-600 mb-4 font-medium">Download the Lenco mobile app</p>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Full business banking available to you on the go in Lenco. Everything from banking, and invoicing to payments, sending and receiving money to business-specific features.
              </p>
              <div className="flex gap-4">
                <Button 
                  className="bg-black hover:bg-gray-800 text-white h-14 px-5"
                >
                  <Apple className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <p className="text-[10px] leading-tight opacity-80">Download on the</p>
                    <p className="font-semibold text-sm">App Store</p>
                  </div>
                </Button>
                <Button 
                  className="bg-black hover:bg-gray-800 text-white h-14 px-5"
                >
                  <Play className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <p className="text-[10px] leading-tight opacity-80">Get it on</p>
                    <p className="font-semibold text-sm">Google Play</p>
                  </div>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
                  <div className="bg-blue-600 text-white p-6 text-center">
                    <p className="text-xs opacity-80 mb-1">Bill Payment</p>
                    <p className="text-2xl font-bold">₦4,200,000</p>
                  </div>
                  <div className="flex-1 p-4 bg-slate-50">
                    <p className="text-xs text-gray-500 mb-3 font-medium">Recent Payments</p>
                    <div className="space-y-2">
                      <Card className="shadow-sm">
                        <CardContent className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <Tv className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="text-sm font-medium">Electricity</span>
                          </div>
                          <span className="text-xs text-gray-500">₦25,000</span>
                        </CardContent>
                      </Card>
                      <Card className="shadow-sm">
                        <CardContent className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <Wifi className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="text-sm font-medium">Internet</span>
                          </div>
                          <span className="text-xs text-gray-500">₦15,000</span>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Need to Speak to us?</h2>
              <div className="space-y-4">
                <a href="tel:+2349065211609" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>+234 906 521 1609</span>
                </a>
                <a href="tel:+2349065211608" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>+234 906 521 1608</span>
                </a>
                <a href="mailto:support@lenco.co" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>support@lenco.co</span>
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="border border-gray-200 rounded-lg px-4 data-[state=open]:bg-slate-50"
                  >
                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
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
