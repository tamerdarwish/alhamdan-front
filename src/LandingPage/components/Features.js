// components/Features.js
import React from 'react';
import './Features.css';

const Features = () => (
  <section id="features" className="features">
    <div className="features-container">
      <h2 className="features-title">ما الذي يجعلنا مميزين</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-container">
            <i className="fas fa-trophy feature-icon"></i>
          </div>
          <h3 className="feature-title">الخبرة والاحترافية</h3>
          <p className="feature-description">مع سنوات من الخبرة، يضمن فريقنا المتخصص أعلى جودة لذكريات زفافك.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-container">
            <i className="fas fa-camera feature-icon"></i>
          </div>
          <h3 className="feature-title">التكنولوجيا المتقدمة</h3>
          <p className="feature-description">نحن نستخدم أحدث الكاميرات والمعدات لتقديم صور ومقاطع فيديو عالية الجودة.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-container">
            <i className="fas fa-paint-brush feature-icon"></i>
          </div>
          <h3 className="feature-title">التصوير الإبداعي</h3>
          <p className="feature-description">ستجعل أساليب التصوير الفوتوغرافي الإبداعية والفريدة لدينا كل لحظة مميزة.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-container">
            <i className="fas fa-edit feature-icon"></i>
          </div>
          <h3 className="feature-title">التحرير الاحترافي</h3>
          <p className="feature-description">خدمات التحرير الاحترافية لتحسين صورك والتقاط أفضل اللحظات.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
