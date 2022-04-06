import React from 'react';

const RenameGuide: React.FC = () => {
  return (
    <div>
      <p>
        เมื่อกดที่ชื่อจะสามารถเปลี่ยนชื่อที่แสดงได้ เมื่อพิมพ์เสร็จให้กดปุ่ม
        Enter บนคีย์บอร์ดเป็นอันเสร็จสิ้น
      </p>
      <p>
        <mark>**ชื่อต้องมีขนาดมากกว่า 5 ตัวอักษรขึ้นไป**</mark>
      </p>
    </div>
  );
};

export default RenameGuide;
