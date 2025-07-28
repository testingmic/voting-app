import React, { useState } from 'react';
import {
  CreditCard,
  Check,
  Star,
  Users,
  Calendar,
  BarChart2,
  Clock,
  Shield,
  Download,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  description: string;
  cardLast4: string;
  cardBrand: string;
}

const SubscriptionPage: React.FC = () => {
  const [selectedInterval, setSelectedInterval] = useState<'monthly' | 'yearly'>('monthly');

  // Mock data
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: selectedInterval === 'monthly' ? 29 : 290,
      interval: selectedInterval,
      features: [
        'Up to 5 active elections',
        '500 voters per election',
        'Basic analytics',
        'Email support',
        'Standard security features'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: selectedInterval === 'monthly' ? 79 : 790,
      interval: selectedInterval,
      isPopular: true,
      features: [
        'Up to 20 active elections',
        '2,000 voters per election',
        'Advanced analytics',
        'Priority support',
        'Enhanced security features',
        'Custom branding',
        'API access'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: selectedInterval === 'monthly' ? 199 : 1990,
      interval: selectedInterval,
      features: [
        'Unlimited active elections',
        'Unlimited voters',
        'Enterprise analytics',
        '24/7 dedicated support',
        'Advanced security features',
        'Custom integrations',
        'SLA guarantees',
        'On-premise deployment'
      ]
    }
  ];

  const transactions: Transaction[] = [
    {
      id: 'txn_1',
      date: '2024-02-15',
      amount: 79,
      status: 'success',
      description: 'Professional Plan - Monthly',
      cardLast4: '4242',
      cardBrand: 'visa'
    },
    {
      id: 'txn_2',
      date: '2024-01-15',
      amount: 79,
      status: 'success',
      description: 'Professional Plan - Monthly',
      cardLast4: '4242',
      cardBrand: 'visa'
    },
    {
      id: 'txn_3',
      date: '2024-01-01',
      amount: 29,
      status: 'failed',
      description: 'Basic Plan - Monthly',
      cardLast4: '4242',
      cardBrand: 'visa'
    }
  ];

  const currentPlan = plans[1]; // Pro plan for demo

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscription & Billing</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your subscription and view payment history</p>
      </div>

      {/* Current Plan */}
      <GlassCard className="mb-8 transform hover:scale-105 transition-all duration-300">
        <GlassCardBody>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Current Plan</h2>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-purple-500" />
                <span className="text-lg font-medium text-gray-900 dark:text-white">{currentPlan.name}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Active
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Your next payment of ${currentPlan.price} will be processed on March 15, 2024
              </p>
            </div>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30"
            >
              Manage Plan
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">1,247 Voters</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total voters this month</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">8 Elections</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Active elections</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
              <BarChart2 className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">78% Usage</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Of your plan limit</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Enhanced</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Security features</p>
            </div>
          </div>
        </GlassCardBody>
      </GlassCard>

      {/* Plans */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Available Plans</h2>
          <div className="flex items-center p-1 bg-gray-100 dark:bg-dark-300 rounded-lg">
            <button
              onClick={() => setSelectedInterval('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                selectedInterval === 'monthly'
                  ? 'bg-white dark:bg-dark-200 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedInterval('yearly')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                selectedInterval === 'yearly'
                  ? 'bg-white dark:bg-dark-200 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-1 text-xs text-green-600 dark:text-green-400">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <GlassCard
              key={plan.id}
              className={`transform hover:scale-105 transition-all duration-300 ${
                plan.isPopular ? 'ring-2 ring-purple-500 dark:ring-purple-400' : ''
              }`}
            >
              <GlassCardBody>
                {plan.isPopular && (
                  <span className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">/{plan.interval}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={
                    plan.id === currentPlan.id
                      ? 'w-full bg-gray-100 text-gray-600 dark:bg-dark-300 dark:text-gray-400 cursor-default'
                      : 'w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white'
                  }
                  disabled={plan.id === currentPlan.id}
                >
                  {plan.id === currentPlan.id ? 'Current Plan' : 'Upgrade'}
                </Button>
              </GlassCardBody>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payment History</h2>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>

        <GlassCard>
          <GlassCardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-3 text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
                    <th className="pb-3 text-sm font-medium text-gray-600 dark:text-gray-400">Description</th>
                    <th className="pb-3 text-sm font-medium text-gray-600 dark:text-gray-400">Amount</th>
                    <th className="pb-3 text-sm font-medium text-gray-600 dark:text-gray-400">Card</th>
                    <th className="pb-3 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                    <th className="pb-3 text-sm font-medium text-gray-600 dark:text-gray-400"></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-4 text-sm text-gray-900 dark:text-white">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-sm text-gray-900 dark:text-white">
                        {transaction.description}
                      </td>
                      <td className="py-4 text-sm text-gray-900 dark:text-white">
                        ${transaction.amount}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            •••• {transaction.cardLast4}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          {getStatusIcon(transaction.status)}
                          <span className={`ml-2 text-sm ${
                            transaction.status === 'success'
                              ? 'text-green-600 dark:text-green-400'
                              : transaction.status === 'pending'
                              ? 'text-orange-600 dark:text-orange-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCardBody>
        </GlassCard>
      </div>
    </div>
  );
};

export default SubscriptionPage; 