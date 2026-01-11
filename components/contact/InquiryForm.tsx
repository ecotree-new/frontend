'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EVENT_TYPES, EMAIL_DOMAINS } from '@/lib/constants';

interface FormData {
  eventType: string;
  phone1: string;
  phone2: string;
  phone3: string;
  emailId: string;
  emailDomain: string;
  customDomain: string;
  organizationName: string;
  content: string;
  privacyConsent: boolean;
}

const PRIVACY_POLICY_TEXT = `개인정보보호법 규정에 따라 (주)에코트리(이하 '회사')는 에코트리(이하 '서비스')에 대해 문의하시는 이용자분들께 수집하는 개인정보 항목, 이용목적 및 개인정보의 보유 및 이용기간을 안내드리니 자세히 읽어 보시고, 동의하여 주시기 바랍니다.

1. 개인정보의 이용 목적
회사는 개인정보를 다음의 목적을 위해 이용합니다. 이용되는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경될 시에는 사전 동의를 구할 예정입니다.
- 이용 목적: 고객센터 상담 문의
2. 개인정보의 항목 및 수집 방법
회사는 고객문의에 대한 상담업무를 위해 아래와 같은 개인정보를 수집하고 있습니다.`;

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    eventType: '',
    phone1: '',
    phone2: '',
    phone3: '',
    emailId: '',
    emailDomain: '',
    customDomain: '',
    organizationName: '',
    content: '',
    privacyConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'organizationName' && value.length > 30) return;
    if (name === 'content' && value.length > 5000) return;
    if ((name === 'phone1' || name === 'phone2' || name === 'phone3') && value.length > 4) return;

    // Only allow numbers for phone fields
    if ((name === 'phone1' || name === 'phone2' || name === 'phone3') && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyConsent) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    const emailDomain = formData.emailDomain || formData.customDomain;
    const fullEmail = `${formData.emailId}@${emailDomain}`;
    const fullPhone = `${formData.phone1}-${formData.phone2}-${formData.phone3}`;
    const eventTypeLabel = EVENT_TYPES.find((t) => t.value === formData.eventType)?.label || formData.eventType;

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          event_type: eventTypeLabel,
          phone: fullPhone,
          email: fullEmail,
          organization_name: formData.organizationName,
          message: formData.content,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitResult({ success: true, message: '문의가 성공적으로 접수되었습니다.' });
      setFormData({
        eventType: '',
        phone1: '',
        phone2: '',
        phone3: '',
        emailId: '',
        emailDomain: '',
        customDomain: '',
        organizationName: '',
        content: '',
        privacyConsent: false,
      });
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitResult({ success: false, message: '문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.privacyConsent &&
    formData.eventType &&
    formData.phone1 &&
    formData.phone2 &&
    formData.phone3 &&
    formData.emailId &&
    (formData.emailDomain || formData.customDomain) &&
    formData.organizationName &&
    formData.content;

  return (
    <div>
      {submitResult && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submitResult.success
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {submitResult.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Form Container - Two Column Layout */}
        <div className="flex overflow-hidden">
          {/* Left Column - Labels */}
          <div className="w-[200px] md:w-[280px] flex-shrink-0 bg-[#EDF3FF]">
            <div className="h-[72px] flex items-center justify-center">
              <span className="text-[14px] text-[#111111] font-medium">행사 종류 <span className="text-[#111111]">*</span></span>
            </div>
            <div className="h-[72px] flex items-center justify-center">
              <span className="text-[14px] text-[#111111] font-medium">전화 번호 <span className="text-[#111111]">*</span></span>
            </div>
            <div className="h-[72px] flex items-center justify-center">
              <span className="text-[14px] text-[#111111] font-medium">이메일 <span className="text-[#111111]">*</span></span>
            </div>
            <div className="h-[72px] flex items-center justify-center">
              <span className="text-[14px] text-[#111111] font-medium">단체명, 기업명 <span className="text-[#111111]">*</span></span>
            </div>
            <div className="h-[200px] flex items-center justify-center">
              <span className="text-[14px] text-[#111111] font-medium">문의내용 <span className="text-[#111111]">*</span></span>
            </div>
            <div className="h-[240px] flex items-center justify-center">
              <span className="text-[14px] text-[#111111] text-center leading-tight font-medium">개인정보 수집 및 이용 동의 <span className="text-[#111111]">*</span></span>
            </div>
          </div>

          {/* Right Column - Inputs */}
          <div className="flex-1 bg-white">
            {/* Event Type */}
            <div className="h-[72px] flex items-center py-4 px-[65px]">
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#D1DBF6] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1B67FF] text-[14px] text-[#727783]"
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number */}
            <div className="h-[72px] flex items-center py-4 px-[65px]">
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  name="phone1"
                  value={formData.phone1}
                  onChange={handleChange}
                  maxLength={4}
                  className="flex-1 px-4 py-2 border border-[#D1DBF6] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1B67FF] text-[14px] text-center"
                />
                <span className="text-[#727783]">-</span>
                <input
                  type="text"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleChange}
                  maxLength={4}
                  className="flex-1 px-4 py-2 border border-[#D1DBF6] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1B67FF] text-[14px] text-center"
                />
                <span className="text-[#727783]">-</span>
                <input
                  type="text"
                  name="phone3"
                  value={formData.phone3}
                  onChange={handleChange}
                  maxLength={4}
                  className="flex-1 px-4 py-2 border border-[#D1DBF6] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1B67FF] text-[14px] text-center"
                />
              </div>
            </div>

            {/* Email */}
            <div className="h-[72px] flex items-center py-4 px-[65px]">
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-[#D1DBF6] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1B67FF] text-[14px]"
                />
                <span className="text-[#727783]">@</span>
                {formData.emailDomain === '' ? (
                  <input
                    type="text"
                    name="customDomain"
                    value={formData.customDomain}
                    onChange={handleChange}
                    placeholder=""
                    className="flex-1 px-4 py-2 border border-[#D1DBF6] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1B67FF] text-[14px]"
                  />
                ) : (
                  <span className="flex-1 px-4 py-2 border border-[#D1DBF6] rounded bg-gray-50 text-[14px] text-[#727783]">
                    {formData.emailDomain}
                  </span>
                )}
                <select
                  name="emailDomain"
                  value={formData.emailDomain}
                  onChange={handleChange}
                  className="w-[140px] px-3 py-2 border border-[#D1DBF6] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1B67FF] text-[14px] text-[#727783]"
                >
                  {EMAIL_DOMAINS.map((domain) => (
                    <option key={domain.value} value={domain.value}>
                      {domain.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Organization Name */}
            <div className="h-[72px] flex items-center py-4 px-[65px]">
              <div className="relative w-full">
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  maxLength={30}
                  className="w-full px-4 py-2 border border-[#D1DBF6] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1B67FF] text-[14px] pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#BFBFBF]">
                  {formData.organizationName.length}/30
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="h-[200px] flex items-start py-4 px-[65px]">
              <div className="relative w-full">
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  maxLength={5000}
                  className="w-full h-[168px] px-4 py-3 border border-[#D1DBF6] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1B67FF] text-[14px] resize-none"
                />
                <span className="absolute right-3 bottom-3 text-[12px] text-[#BFBFBF]">
                  {formData.content.length}/5000
                </span>
              </div>
            </div>

            {/* Privacy Consent */}
            <div className="h-[240px] py-4 px-[65px]">
              <div className="h-[160px] p-4 border border-[#D1DBF6] rounded overflow-y-auto mb-4">
                <p className="text-[12px] text-[#C4C4C4] leading-relaxed whitespace-pre-wrap">
                  {PRIVACY_POLICY_TEXT}
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#1B67FF] focus:ring-[#1B67FF]"
                />
                <span className="text-[14px] text-[#111111]">개인정보 수집 및 이용에 동의합니다.</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`
            w-full mt-6 py-4 font-medium rounded-lg transition-all text-[16px]
            ${isFormValid && !isSubmitting
              ? 'bg-[#1B67FF] text-white hover:bg-[#1554cc]'
              : 'bg-[#C5D9FF] text-white cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? '전송 중...' : '문의하기'}
        </button>
      </form>
    </div>
  );
}
