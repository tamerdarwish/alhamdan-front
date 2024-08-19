import React, { useRef, useEffect } from 'react';

const WatermarkImage = ({ image, watermarkSetting }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      if (watermarkSetting > 0) {
        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = 'center';

        if (watermarkSetting === 1) {
          ctx.fillText('Watermark', canvas.width - 70, canvas.height - 30);
        } else if (watermarkSetting === 2) {
          ctx.fillText('Watermark', canvas.width / 2, canvas.height / 2);
        }
      }
    };

    img.src = image.url;
  }, [image, watermarkSetting]);

  return <canvas ref={canvasRef}></canvas>;
};

export default WatermarkImage; // تصدير المكون كـ default export
