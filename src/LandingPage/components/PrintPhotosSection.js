import React from 'react';
import './PrintPhotosSection.css'; // استيراد ملف CSS الخاص بالقسم
import printImage from "../../assets/print-section.png"
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate

export default function PrintPhotosSection() {
  const navigate = useNavigate(); // تفعيل التنقل

  const handlePrintButtonClick = () => {
    navigate('/print'); // التوجيه إلى صفحة /print
  };

  return (
    <section className="print-photos-section">
      <div className="print-photos-content">
        <div className="text-content">
          <h2 className="section-title">أرسل صورك للطباعة مباشرة!</h2>
          <p className="section-description">
            الآن يمكنك إرسال صورك للطباعة بسهولة تامة وبالأحجام المناسبة مباشرة من خلال موقعنا. اختر الحجم الذي تفضله،
            ونحن سنتكفل بالباقي. اجعل صورك تظل حية للذكرى!
          </p>
          <button className="cta-button" onClick={handlePrintButtonClick}>إرسال الصور للطباعة</button>
        </div>
        <div className="image-content">
          <img
            src={printImage} // وضع رابط الصورة الخاصة بك هنا
            alt="Image print service"
            className="print-image"
          />
        </div>
      </div>
    </section>
  );
}
