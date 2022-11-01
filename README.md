# Family Pay

ระบบจัดการยอดชำระเงินสำหรับหัวหน้าครอบครัวที่มีกลุ่มหารค่าบริการรายเดือนของ Spotify หรือ Youtube Premium ในรูปแบบ Family Plan 

## Feature

**สำหรับหัวหน้าครอบครัว**

*ต้องมีบัญชีผู้ใช้และเข้าสู่ระบบก่อนที่จะสามารถใช้งานได้*
สามารถสร้างบัญชีผู้ใช้งานผ่านทาง : https://family-pay-14de8.web.app/register
 - สร้างกลุ่มสำหรับหารค่าบริการ กำหนดค่าบริการ และวันที่จ่ายเงิน
 - Generate family token สำหรับส่งให้สมาชิกในครอบครัว เพื่อเข้าถึงหน้า Dashboard ของครอบครัว
 - จัดการข้อมูลสมาชิก
 - บันทึกยอดเงินที่สมาชิกจ่าย และคำนวนยอดเดือนที่ต้องจ่ายครั้งต่อไป
 - ตรวบสอบประวัติการทำรายการได้

**สำหรับสมาชิก**
 - สามารถเข้ามาตรวจสอบสถานะการจ่ายเงินของตนเองได้
 - แสดง QR Code PromptPay ตามระดับราคาและจำนวนเดือนที่ต้องการเลือกจ่ายได้
 - Line Chat Bot สำหรับแจ้งเตือนสมาชิกที่ถึงกำหนดจ่ายเงิน ณ เดือนนั้นๆ เป็นข้อความแบบส่วนตัว และแจ้งเตือนเมื่อหัวหน้าครอบครัวทำการอัปเดตข้อมูลการจ่ายเงินในระบบให้แล้ว


## Tech Stack & Libraries
 - MERN Stack (Mongo, Express.js, React.js, node.js)
 - Tailwind CSS
 - [Echo Framework (Log Service)](https://github.com/11SF/go-log-manager)
 - SQLite
 - JWT
 - Firebase hosting
 - Cloudflare
 - Docker
 - AWS EC2
 - Line Messaging API

Website URL: https://family-pay-14de8.web.app/
