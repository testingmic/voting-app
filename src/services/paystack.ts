interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  currency: string;
  plan?: string;
  callback: (response: any) => void;
  onClose: () => void;
}

interface PaystackResponse {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: PaystackConfig) => {
        openIframe: () => void;
      };
    };
  }
}

export class PaystackService {
  private static instance: PaystackService;
  private publicKey: string;

  private constructor() {
    this.publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_your_paystack_key_here';
  }

  public static getInstance(): PaystackService {
    if (!PaystackService.instance) {
      PaystackService.instance = new PaystackService();
    }
    return PaystackService.instance;
  }

  public initializePayment(config: Omit<PaystackConfig, 'key'>): Promise<PaystackResponse> {
    return new Promise((resolve, reject) => {
      if (!window.PaystackPop) {
        reject(new Error('Paystack script not loaded'));
        return;
      }

      const handler = window.PaystackPop.setup({
        key: this.publicKey,
        ...config,
        callback: (response: PaystackResponse) => {
          if (response.status === 'success') {
            resolve(response);
          } else {
            reject(new Error(response.message || 'Payment failed'));
          }
        },
        onClose: () => {
          reject(new Error('Payment cancelled by user'));
        }
      });

      handler.openIframe();
    });
  }

  public async verifyPayment(reference: string): Promise<any> {
    try {
      const response = await fetch(`/api/paystack/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }

  public async createSubscription(planCode: string, email: string): Promise<any> {
    try {
      const response = await fetch('/api/paystack/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: planCode,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Subscription creation error:', error);
      throw error;
    }
  }

  public async cancelSubscription(subscriptionCode: string): Promise<any> {
    try {
      const response = await fetch(`/api/paystack/subscription/${subscriptionCode}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Subscription cancellation error:', error);
      throw error;
    }
  }
}

export default PaystackService.getInstance(); 