// components/AboutUs.js
import React from 'react';
import './About.css';
import aboutVideo from '../../assets/about.mp4';

const About = () => (
  <section id="about-us" className="about-us">
    <div className="about-us-container">
      <div className="about-us-image">
      <video controls loop className="about-video">
  <source src={aboutVideo} type="video/mp4" />
  Your browser does not support the video tag.
</video>

              </div>
      <div className="about-us-content">
        <h2 className="about-us-title">من نحن</h2>
        <p className="about-us-text">
        أهلاً بكم في ستوديو الحمدان، حيث نلتقط أجمل لحظاتك بإبداع ودقة. يتمتع فريقنا من المصورين ومصوري الفيديو المحترفين بخبرة تمتد لسنوات لضمان الحفاظ على كل تفاصيل يومك الخاص بشكل جميل.        </p>
        <p className="about-us-text">
        نحن متخصصون في تصوير حفلات الزفاف وتصوير الفيديو، ونقدم مجموعة من الخدمات بدءًا من التصوير قبل الزفاف وحتى التغطية الكاملة لليوم. إن التزامنا باستخدام أحدث التقنيات ونهجنا الإبداعي يضمن نتائج مذهلة ستعتز بها إلى الأبد.        </p>
        <p className="about-us-text">
        في ستوديو الحمدان، رضاكم هو أولويتنا القصوى. نعمل معك عن كثب لفهم رؤيتك وضمان التقاط كل لحظة كما تخيلتها بالضبط.        </p>
      </div>
    </div>
  </section>
);

export default About;
