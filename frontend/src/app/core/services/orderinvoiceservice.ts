import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { OrderService } from './orderdata.service';
@Injectable({
  providedIn: 'root'
})
export class OrderInvoiceService {

  constructor(private orderService: OrderService) {}

  async generateInvoice(orderId: string) {
    const order = this.orderService.getOrderById(orderId);
    if (!order) return;

    const doc = new jsPDF('p', 'mm', 'a4');

    // --- Header: Logo and Company ---
    const logoPath = '../assets/cart/logo1.PNG'; // update with your logo path
    try {
      const logoImg = await this.getImageData(logoPath);
      doc.addImage(logoImg, 'PNG', 15, 10, 40, 20);
    } catch (err) {
      console.error('Logo load error', err);
    }

    doc.setFontSize(18);
    doc.setTextColor(30, 60, 90);
    doc.text('NextBuy', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text('Your one stop destination for all needs', 105, 27, { align: 'center' });

    // --- Invoice title ---
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(15, 32, 195, 32);
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('INVOICE', 105, 40, { align: 'center' });

    // --- Order & Recipient Info ---
    doc.setFontSize(12);
    let yPos = 50;
    doc.text(`Order ID: ${order.id}`, 20, yPos);
    yPos += 7;
    doc.text(`Recipient: ${order.recipientName}`, 20, yPos);
    yPos += 7;
    doc.text(`Address: ${order.deliveryAddress}`, 20, yPos);
    yPos += 7;
    doc.text(`Phone: ${order.phone}`, 20, yPos);
    yPos += 7;
    doc.text(`Placed: ${order.placedDate}`, 20, yPos);
     yPos += 7;
    doc.text(`Payment Mode: ${order.paymentMode}`, 20, yPos);
    yPos += 10;

    // --- Product Image (top-right) ---
    if (order.imageUrl) {
      try {
        const img = await this.getImageData(order.imageUrl);
        doc.addImage(img, 'JPEG', 145, 50, 40, 40); // reduced width and height
      } catch (err) {
        console.error('Product image load error', err);
      }
    }

    // --- Products Table Header ---
    let tableStartY = 110; // space below image
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(50, 50, 150);
    doc.rect(15, tableStartY, 180, 10, 'F'); // header background
    doc.text('Product', 20, tableStartY + 7);
    doc.text('Price (₹)', 160, tableStartY + 7, { align: 'right' });
    tableStartY += 10;

    // --- Product Row ---
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(245, 245, 245);
    doc.rect(15, tableStartY, 180, 15, 'F');
    doc.text(order.productName, 20, tableStartY + 10);
    doc.text(`${order.price.toFixed(2)}`, 190, tableStartY + 10, { align: 'right' });

    tableStartY += 20;

    // --- Total Section ---
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Total:', 150, tableStartY);

    // Reduce spacing between digits for neatness
    doc.setCharSpace(0);  
    doc.text(`${order.price.toFixed(2)} ₹`, 190, tableStartY, { align: 'right' });

    // Reset char spacing to default
    doc.setCharSpace(0);

    tableStartY += 10;

    // --- Status Info ---
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    if (order.status === 'Cancelled') {
      doc.setTextColor(200, 0, 0);
      doc.text(`Order Cancelled: ${order.cancellationReasons}`, 20, tableStartY);
    } else if (order.status === 'Returned') {
      doc.setTextColor(255, 165, 0);
      doc.text(`Order Returned: ${order.returnReasons}`, 20, tableStartY);
    } else {
      doc.setTextColor(0, 128, 0);
      doc.text(`Delivered on: ${order.deliveredDate}`, 20, tableStartY);
    }

    doc.save(`Invoice_${order.id}.pdf`);
  }

  private getImageData(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url.startsWith('http') ? url : url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject('Canvas context error');
        }
      };
      img.onerror = (err) => reject(err);
    });
  }
}
