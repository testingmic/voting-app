import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import GlassCard, { GlassCardHeader, GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Check, Crown, CreditCard, Download, Calendar, Users, Zap, Shield, X, AlertTriangle, Star, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import paystackService from '../services/paystack';
import PaymentMethods from '../components/settings/PaymentMethods';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
  maxElections: number;
  maxVoters: number;
  support: string;
  paystackPlanCode: string;
  description: string;
  highlight?: string;
}

interface PaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'failed';
  date: string;
  description: string;
  reference: string;
}

const SubscriptionPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('plans');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelingSubscription, setCancelingSubscription] = useState(false);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      currency: 'USD',
      interval: 'month',
      description: 'Perfect for small organizations getting started',
      features: [
        'Up to 3 elections per month',
        'Up to 100 voters per election',
        'Basic analytics dashboard',
        'Email support',
        'Standard voting templates',
        'Basic security features'
      ],
      maxElections: 3,
      maxVoters: 100,
      support: 'Email',
      paystackPlanCode: ''
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      currency: 'USD',
      interval: 'month',
      description: 'Ideal for growing organizations with advanced needs',
      popular: true,
      highlight: 'Most Popular',
      features: [
        'Unlimited elections',
        'Up to 1,000 voters per election',
        'Advanced analytics & insights',
        'Priority email & chat support',
        'Custom branding & themes',
        'API access for integrations',
        'Export results to PDF/CSV',
        'Advanced security & audit logs',
        'Real-time notifications',
        'Multi-language support'
      ],
      maxElections: -1,
      maxVoters: 1000,
      support: 'Priority',
      paystackPlanCode: 'PLN_pro_monthly'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      currency: 'USD',
      interval: 'month',
      description: 'For large organizations requiring enterprise-grade features',
      features: [
        'Unlimited elections & voters',
        'Advanced analytics & reporting',
        '24/7 phone & priority support',
        'Custom branding & white-labeling',
        'Full API access & webhooks',
        'Advanced export options',
        'Enterprise security features',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantees',
        'On-premise deployment options',
        'Advanced user management'
      ],
      maxElections: -1,
      maxVoters: -1,
      support: '24/7 Phone',
      paystackPlanCode: 'PLN_enterprise_monthly'
    }
  ];

  const paymentHistory: PaymentHistory[] = [
    {
      id: '1',
      amount: 29,
      currency: 'USD',
      status: 'success',
      date: '2024-01-15',
      description: 'Pro Plan - Monthly',
      reference: 'PS_123456789'
    },
    {
      id: '2',
      amount: 29,
      currency: 'USD',
      status: 'success',
      date: '2024-12-15',
      description: 'Pro Plan - Monthly',
      reference: 'PS_123456788'
    }
  ];

  const currentPlan = plans[1]; // Pro plan for demo

  const handleUpgrade = async (plan: Plan) => {
    if (plan.id === 'free') {
      toast.error('You are already on the free plan');
      return;
    }

    if (!user?.email) {
      toast.error('Please log in to upgrade your subscription');
      return;
    }

    setSelectedPlan(plan.id);
    setLoading(true);

    try {
      // Initialize Paystack payment
      const response = await paystackService.initializePayment({
        email: user.email,
        amount: plan.price * 100, // Paystack expects amount in kobo (smallest currency unit)
        currency: plan.currency,
        plan: plan.paystackPlanCode,
        callback: function(response: any) {
          // This will be handled by the Promise
        },
        onClose: function() {
          // This will be handled by the Promise
        }
      });

      // Payment successful
      toast.success('Payment successful! Your subscription has been upgraded.');
      
      // Here you would typically:
      // 1. Verify the payment with your backend
      // 2. Update the user's subscription status
      // 3. Send confirmation email
      
      console.log('Payment response:', response);
      
    } catch (error) {
      console.error('Payment error:', error);
      if (error instanceof Error && error.message === 'Payment cancelled by user') {
        toast.error('Payment cancelled');
      } else {
        toast.error('Payment failed. Please try again.');
      }
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  const handleCancelSubscription = async () => {
    if (currentPlan.id === 'free') {
      toast.error('Free plan cannot be cancelled');
      return;
    }

    setShowCancelModal(true);
  };

  const confirmCancelSubscription = async () => {
    setCancelingSubscription(true);
    try {
      // Here you would make an API call to cancel the subscription
      // await paystackService.cancelSubscription('subscription_code');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast.success('Subscription cancelled successfully');
      setShowCancelModal(false);
      setCancelReason('');
      
      // Here you would typically update the user's subscription status
      // and redirect them to a different plan or show a downgrade message
      
    } catch (error) {
      toast.error('Failed to cancel subscription. Please try again.');
    } finally {
      setCancelingSubscription(false);
    }
  };

  const downloadInvoice = (payment: PaymentHistory) => {
    // Generate and download invoice
    const invoiceData = {
      reference: payment.reference,
      amount: payment.amount,
      currency: payment.currency,
      date: payment.date,
      description: payment.description,
      customer: {
        name: user?.name || 'User',
        email: user?.email || 'user@example.com'
      }
    };
    
    const blob = new Blob([JSON.stringify(invoiceData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${payment.reference}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Invoice downloaded');
  };

  const tabs = [
    { id: 'plans', name: 'Plans', icon: Crown },
    { id: 'billing', name: 'Billing History', icon: CreditCard },
    { id: 'payment-methods', name: 'Payment Methods', icon: CreditCard }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscription</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your subscription and billing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <GlassCard>
            <GlassCardBody>
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-dark-300/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </GlassCardBody>
          </GlassCard>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'plans' && (
            <div className="space-y-8">
              {/* Current Plan */}
              <GlassCard className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                <GlassCardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Current Plan</h2>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Your active subscription details
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        currentPlan.id === 'free' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
                        currentPlan.id === 'pro' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      }`}>
                        {currentPlan.id === 'free' ? 'Free Plan' : currentPlan.id === 'pro' ? 'Pro Plan' : 'Enterprise Plan'}
                      </div>
                    </div>
                  </div>
                </GlassCardHeader>
                <GlassCardBody>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 rounded-xl ${
                        currentPlan.id === 'free' ? 'bg-gray-100 dark:bg-gray-800' :
                        currentPlan.id === 'pro' ? 'bg-gradient-to-br from-primary-500 to-primary-600' :
                        'bg-gradient-to-br from-purple-500 to-purple-600'
                      }`}>
                        <Crown className={`w-8 h-8 ${
                          currentPlan.id === 'free' ? 'text-gray-600 dark:text-gray-400' :
                          'text-white'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{currentPlan.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ${currentPlan.price}/{currentPlan.interval}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Next billing</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">January 15, 2024</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                      <div className="flex items-center justify-center mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">Active</span>
                      </div>
                    </div>
                  </div>
                  {currentPlan.id !== 'free' && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        variant="outline"
                        onClick={handleCancelSubscription}
                        loading={loading}
                        className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20"
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                  )}
                </GlassCardBody>
              </GlassCard>

              {/* Available Plans */}
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Plan</h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Select the perfect plan for your organization. All plans include our core voting features with different levels of advanced capabilities.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {plans.map((plan) => (
                    <GlassCard 
                      key={plan.id} 
                      className={`relative transform transition-all duration-300 hover:scale-105 ${
                        plan.popular ? 'ring-2 ring-primary-500 shadow-xl' : 'hover:shadow-lg'
                      } ${plan.id === currentPlan.id ? 'ring-2 ring-green-500' : ''}`}
                    >
                      {plan.popular && plan.id !== currentPlan.id && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                            <Sparkles className="w-4 h-4 mr-2" />
                            {plan.highlight}
                          </div>
                        </div>
                      )}
                      
                      {plan.id === currentPlan.id && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                            <Check className="w-4 h-4 mr-2" />
                            Current
                          </div>
                        </div>
                      )}

                      <GlassCardBody className="p-6">
                        <div className="text-center mb-6">
                          <div className={`inline-flex p-4 rounded-xl mb-4 ${
                            plan.id === 'free' ? 'bg-gray-100 dark:bg-gray-800' :
                            plan.id === 'pro' ? 'bg-gradient-to-br from-primary-500 to-primary-600' :
                            'bg-gradient-to-br from-purple-500 to-purple-600'
                          }`}>
                            <Crown className={`w-8 h-8 ${
                              plan.id === 'free' ? 'text-gray-600 dark:text-gray-400' : 'text-white'
                            }`} />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>
                          <div className="mb-4">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                            <span className="text-gray-600 dark:text-gray-400">/{plan.interval}</span>
                          </div>
                          {plan.id === 'free' && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">No credit card required</p>
                          )}
                        </div>
                        
                        <div className="space-y-3 mb-8">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3">
                          {plan.id === currentPlan.id ? (
                            <Button
                              disabled
                              className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Current Plan
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleUpgrade(plan)}
                              loading={loading && selectedPlan === plan.id}
                              className={`w-full ${
                                plan.id === 'free' 
                                  ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                                  : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white shadow-lg shadow-primary-500/25'
                              }`}
                            >
                              {plan.id === 'free' ? 'Downgrade' : 'Upgrade'}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          )}
                        </div>
                      </GlassCardBody>
                    </GlassCard>
                  ))}
                </div>
              </div>

              {/* Plan Comparison */}
              <GlassCard>
                <GlassCardHeader>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Plan Comparison</h3>
                </GlassCardHeader>
                <GlassCardBody>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Feature</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Free</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Pro</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">Elections per month</td>
                          <td className="py-3 px-4 text-center text-sm text-gray-900 dark:text-white">3</td>
                          <td className="py-3 px-4 text-center text-sm text-gray-900 dark:text-white">Unlimited</td>
                          <td className="py-3 px-4 text-center text-sm text-gray-900 dark:text-white">Unlimited</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">Voters per election</td>
                          <td className="py-3 px-4 text-center text-sm text-gray-900 dark:text-white">100</td>
                          <td className="py-3 px-4 text-center text-sm text-gray-900 dark:text-white">1,000</td>
                          <td className="py-3 px-4 text-center text-sm text-gray-900 dark:text-white">Unlimited</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">Support</td>
                          <td className="py-3 px-4 text-center text-sm text-gray-900 dark:text-white">Email</td>
                          <td className="py-3 px-4 text-center text-sm text-gray-900 dark:text-white">Priority</td>
                          <td className="py-3 px-4 text-center text-sm text-gray-900 dark:text-white">24/7 Phone</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">Custom Branding</td>
                          <td className="py-3 px-4 text-center">
                            <X className="w-4 h-4 text-red-500 mx-auto" />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Check className="w-4 h-4 text-green-500 mx-auto" />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Check className="w-4 h-4 text-green-500 mx-auto" />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">API Access</td>
                          <td className="py-3 px-4 text-center">
                            <X className="w-4 h-4 text-red-500 mx-auto" />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Check className="w-4 h-4 text-green-500 mx-auto" />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Check className="w-4 h-4 text-green-500 mx-auto" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </GlassCardBody>
              </GlassCard>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <GlassCard>
                <GlassCardHeader>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Payment History</h2>
                </GlassCardHeader>
                <GlassCardBody>
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${
                            payment.status === 'success' ? 'bg-green-100 dark:bg-green-900/20' :
                            payment.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                            'bg-red-100 dark:bg-red-900/20'
                          }`}>
                            <CreditCard className={`w-4 h-4 ${
                              payment.status === 'success' ? 'text-green-600 dark:text-green-400' :
                              payment.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                              'text-red-600 dark:text-red-400'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{payment.description}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(payment.date).toLocaleDateString()} • {payment.reference}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-gray-900 dark:text-white">
                              ${payment.amount} {payment.currency}
                            </p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              payment.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              {payment.status}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadInvoice(payment)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCardBody>
              </GlassCard>
            </div>
          )}

          {activeTab === 'payment-methods' && (
            <PaymentMethods />
          )}
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70]">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Cancel Subscription</h3>
              </div>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
                <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">What happens when you cancel?</h4>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li>• You'll lose access to premium features immediately</li>
                  <li>• Your current billing period will end on January 15, 2024</li>
                  <li>• You'll be downgraded to the Free plan</li>
                  <li>• You can reactivate your subscription anytime</li>
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason for cancellation (optional)
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent"
                >
                  <option value="">Select a reason...</option>
                  <option value="too_expensive">Too expensive</option>
                  <option value="not_using">Not using enough</option>
                  <option value="missing_features">Missing features</option>
                  <option value="switching">Switching to another service</option>
                  <option value="temporary">Temporary cancellation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {cancelReason === 'other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Please specify
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us more about why you're cancelling..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent"
                  />
                </div>
              )}

              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <input
                  type="checkbox"
                  id="confirmCancel"
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  required
                />
                <label htmlFor="confirmCancel" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  I understand that I will lose access to premium features and my subscription will be cancelled
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCancelModal(false)}
                disabled={cancelingSubscription}
              >
                Keep Subscription
              </Button>
              <Button
                onClick={confirmCancelSubscription}
                loading={cancelingSubscription}
                className="bg-red-600 hover:bg-red-700 text-white border-red-600"
              >
                Cancel Subscription
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage; 