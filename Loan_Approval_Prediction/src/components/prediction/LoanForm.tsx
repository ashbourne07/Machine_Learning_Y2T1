import { useState, type FormEvent } from 'react';
import { LoanApplication } from '../../types';
import { Loader2, Send, RotateCcw } from 'lucide-react';

interface LoanFormProps {
  onSubmit: (data: LoanApplication) => void;
  isLoading: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const initialForm: LoanApplication = {
  Gender: 'Male',
  Married: 'No',
  Dependents: '0',
  Education: 'Graduate',
  Self_Employed: 'No',
  ApplicantIncome: 0,
  CoapplicantIncome: 0,
  LoanAmount: 0,
  Loan_Amount_Term: 360,
  Credit_History: 1,
  Property_Area: 'Urban',
};

export default function LoanForm({ onSubmit, isLoading }: LoanFormProps) {
  const [form, setForm] = useState<LoanApplication>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (form.ApplicantIncome <= 0) errs.ApplicantIncome = 'Income must be greater than 0';
    if (form.CoapplicantIncome < 0) errs.CoapplicantIncome = 'Income cannot be negative';
    if (form.LoanAmount <= 0) errs.LoanAmount = 'Loan amount must be greater than 0';
    if (form.Loan_Amount_Term <= 0) errs.Loan_Amount_Term = 'Loan term must be greater than 0';
    return errs;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched(new Set(Object.keys(errs)));
      return;
    }
    setErrors({});
    onSubmit(form);
  }

  function handleReset() {
    setForm(initialForm);
    setErrors({});
    setTouched(new Set());
  }

  function updateField<K extends keyof LoanApplication>(key: K, value: LoanApplication[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched.has(key)) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function handleBlur(key: string) {
    setTouched((prev) => new Set([...prev, key]));
  }

  const fieldClass = (key: string) =>
    `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
      errors[key] && touched.has(key) ? 'border-red-300' : 'border-slate-300'
    }`;

  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <section>
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            Personal Information
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">Basic applicant details</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="gender" className={labelClass}>Gender</label>
            <select
              id="gender"
              value={form.Gender}
              onChange={(e) => updateField('Gender', e.target.value as LoanApplication['Gender'])}
              className={fieldClass('Gender')}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="married" className={labelClass}>Married</label>
            <select
              id="married"
              value={form.Married}
              onChange={(e) => updateField('Married', e.target.value as LoanApplication['Married'])}
              className={fieldClass('Married')}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="dependents" className={labelClass}>Dependents</label>
            <select
              id="dependents"
              value={form.Dependents}
              onChange={(e) => updateField('Dependents', e.target.value as LoanApplication['Dependents'])}
              className={fieldClass('Dependents')}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3+</option>
            </select>
          </div>
          <div>
            <label htmlFor="education" className={labelClass}>Education</label>
            <select
              id="education"
              value={form.Education}
              onChange={(e) => updateField('Education', e.target.value as LoanApplication['Education'])}
              className={fieldClass('Education')}
            >
              <option value="Graduate">Graduate</option>
              <option value="Not Graduate">Not Graduate</option>
            </select>
          </div>
        </div>
      </section>

      {/* Employment Information */}
      <section>
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            Employment Information
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">Income and employment status</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="selfEmployed" className={labelClass}>Self Employed</label>
            <select
              id="selfEmployed"
              value={form.Self_Employed}
              onChange={(e) =>
                updateField('Self_Employed', e.target.value as LoanApplication['Self_Employed'])
              }
              className={fieldClass('Self_Employed')}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="applicantIncome" className={labelClass}>
              Applicant Income (₹)
            </label>
            <input
              id="applicantIncome"
              type="number"
              min={0}
              placeholder="e.g. 50000"
              value={form.ApplicantIncome || ''}
              onChange={(e) => updateField('ApplicantIncome', Number(e.target.value))}
              onBlur={() => handleBlur('ApplicantIncome')}
              className={fieldClass('ApplicantIncome')}
            />
            {errors.ApplicantIncome && touched.has('ApplicantIncome') && (
              <p className="mt-1 text-xs text-red-500">{errors.ApplicantIncome}</p>
            )}
            <p className="mt-1 text-xs text-slate-400">Monthly income in Rupees</p>
          </div>
          <div>
            <label htmlFor="coapplicantIncome" className={labelClass}>
              Coapplicant Income (₹)
            </label>
            <input
              id="coapplicantIncome"
              type="number"
              min={0}
              placeholder="e.g. 10000"
              value={form.CoapplicantIncome || ''}
              onChange={(e) => updateField('CoapplicantIncome', Number(e.target.value))}
              onBlur={() => handleBlur('CoapplicantIncome')}
              className={fieldClass('CoapplicantIncome')}
            />
            {errors.CoapplicantIncome && touched.has('CoapplicantIncome') && (
              <p className="mt-1 text-xs text-red-500">{errors.CoapplicantIncome}</p>
            )}
            <p className="mt-1 text-xs text-slate-400">Enter 0 if not applicable</p>
          </div>
        </div>
      </section>

      {/* Loan Information */}
      <section>
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            Loan Information
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">Loan amount and repayment details</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="loanAmount" className={labelClass}>
              Loan Amount (₹ in thousands)
            </label>
            <input
              id="loanAmount"
              type="number"
              min={0}
              placeholder="e.g. 200"
              value={form.LoanAmount || ''}
              onChange={(e) => updateField('LoanAmount', Number(e.target.value))}
              onBlur={() => handleBlur('LoanAmount')}
              className={fieldClass('LoanAmount')}
            />
            {errors.LoanAmount && touched.has('LoanAmount') && (
              <p className="mt-1 text-xs text-red-500">{errors.LoanAmount}</p>
            )}
            <p className="mt-1 text-xs text-slate-400">Amount in thousands (200 = ₹2,00,000)</p>
          </div>
          <div>
            <label htmlFor="loanTerm" className={labelClass}>
              Loan Amount Term (days)
            </label>
            <select
              id="loanTerm"
              value={form.Loan_Amount_Term}
              onChange={(e) => updateField('Loan_Amount_Term', Number(e.target.value))}
              className={fieldClass('Loan_Amount_Term')}
            >
              <option value={12}>12 days</option>
              <option value={36}>36 days</option>
              <option value={60}>60 days</option>
              <option value={84}>84 days</option>
              <option value={120}>120 days</option>
              <option value={180}>180 days</option>
              <option value={240}>240 days</option>
              <option value={300}>300 days</option>
              <option value={360}>360 days</option>
              <option value={480}>480 days</option>
            </select>
            <p className="mt-1 text-xs text-slate-400">Repayment period</p>
          </div>
        </div>
      </section>

      {/* Credit Information */}
      <section>
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            Credit Information
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">Credit history assessment</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="creditHistory" className={labelClass}>Credit History</label>
            <select
              id="creditHistory"
              value={form.Credit_History}
              onChange={(e) =>
                updateField('Credit_History', Number(e.target.value) as 0 | 1)
              }
              className={fieldClass('Credit_History')}
            >
              <option value={1}>1 — Good</option>
              <option value={0}>0 — Poor</option>
            </select>
            <p className="mt-1 text-xs text-slate-400">Meets guidelines for credit history</p>
          </div>
        </div>
      </section>

      {/* Property Information */}
      <section>
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            Property Information
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">Property location details</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="propertyArea" className={labelClass}>Property Area</label>
            <select
              id="propertyArea"
              value={form.Property_Area}
              onChange={(e) =>
                updateField('Property_Area', e.target.value as LoanApplication['Property_Area'])
              }
              className={fieldClass('Property_Area')}
            >
              <option value="Urban">Urban</option>
              <option value="Semiurban">Semiurban</option>
              <option value="Rural">Rural</option>
            </select>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Form
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing application...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Predict Loan Approval
            </>
          )}
        </button>
      </div>
    </form>
  );
}
