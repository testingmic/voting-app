import React, { useState } from 'react';
import GlassCard, { GlassCardHeader, GlassCardBody } from '../ui/GlassCard';
import Button from '../ui/Button';
import { CreditCard, Plus, Trash2, X, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface PaymentCard {
  id: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'discover';
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

const PaymentMethods: React.FC = () => {
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: 'card_1',
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2024,
      isDefault: true
    },
    {
      id: 'card_2',
      brand: 'mastercard',
      last4: '8888',
      expMonth: 3,
      expYear: 2025,
      isDefault: false
    }
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSetDefault = async (cardId: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCards(cards.map(card => ({
        ...card,
        isDefault: card.id === cardId
      })));
      
      toast.success('Default payment method updated');
    } catch (error) {
      toast.error('Failed to update default payment method');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCard = async (cardId: string) => {
    const confirmed = window.confirm('Are you sure you want to remove this payment method?');
    
    if (!confirmed) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCards(cards.filter(card => card.id !== cardId));
      toast.success('Payment method removed');
    } catch (error) {
      toast.error('Failed to remove payment method');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = async (formData: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCard: PaymentCard = {
        id: `card_${Date.now()}`,
        brand: 'visa', // This would be determined by the card number
        last4: formData.cardNumber.slice(-4),
        expMonth: parseInt(formData.expiryDate.split('/')[0]),
        expYear: parseInt('20' + formData.expiryDate.split('/')[1]),
        isDefault: formData.setDefault
      };

      if (formData.setDefault) {
        setCards(cards.map(card => ({ ...card, isDefault: false })));
      }

      setCards([...cards, newCard]);
      setShowAddCard(false);
      toast.success('Payment method added successfully');
    } catch (error) {
      toast.error('Failed to add payment method');
    } finally {
      setLoading(false);
    }
  };

  const getBrandIcon = (brand: string) => {
    switch (brand) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      case 'discover':
        return '💳';
      default:
        return '💳';
    }
  };

  const getBrandColor = (brand: string) => {
    switch (brand) {
      case 'visa':
        return 'text-blue-600 dark:text-blue-400';
      case 'mastercard':
        return 'text-red-600 dark:text-red-400';
      case 'amex':
        return 'text-green-600 dark:text-green-400';
      case 'discover':
        return 'text-orange-600 dark:text-orange-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Payment Methods</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your payment methods for subscriptions
          </p>
        </div>
        <Button
          onClick={() => setShowAddCard(true)}
          className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white shadow-lg shadow-primary-500/25"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <GlassCard
            key={card.id}
            className="transform hover:scale-105 transition-all duration-300"
          >
            <GlassCardBody>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <CreditCard className={`w-6 h-6 ${getBrandColor(card.brand)}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900 dark:text-white">
                        •••• {card.last4}
                      </p>
                      {card.isDefault && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Expires {card.expMonth.toString().padStart(2, '0')}/{card.expYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!card.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(card.id)}
                      loading={loading}
                      className="text-primary-600 border-primary-500 hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-900/30"
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCard(card.id)}
                    loading={loading}
                    className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </GlassCardBody>
          </GlassCard>
        ))}
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70]">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Payment Method</h3>
              <button
                onClick={() => setShowAddCard(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddCard({
                cardNumber: formData.get('cardNumber'),
                expiryDate: formData.get('expiryDate'),
                cvc: formData.get('cvc'),
                name: formData.get('name'),
                setDefault: formData.get('setDefault') === 'on'
              });
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    name="cvc"
                    placeholder="123"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Smith"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                />
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="setDefault"
                  name="setDefault"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="setDefault" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Set as default payment method
                </label>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddCard(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white shadow-lg shadow-primary-500/25"
                >
                  Add Card
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Payment Security</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Your payment information is securely stored and processed by our payment provider.
              We never store your full card details on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods; 