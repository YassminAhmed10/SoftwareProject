// utils/pdfGenerator.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateInvoicePDF = (order) => {
  console.log('🎯 PDF Generator called with order:', order);
  
  try {
    const doc = new jsPDF();
    
    // Colors
    const primaryColor = [0, 0, 0];
    const accentColor = [236, 72, 153];
    
    // ============================================
    // HEADER - Black Background with Logo
    // ============================================
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Company Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('RYYZ STORE', 20, 22);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Premium Fashion Destination', 20, 30);
    
    // Invoice Title
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 150, 22);
    
    // Reset text color
    doc.setTextColor(...primaryColor);
    
    // ============================================
    // ORDER INFO BOX
    // ============================================
    doc.setFillColor(248, 248, 248);
    doc.roundedRect(15, 50, 180, 35, 3, 3, 'F');
    
    // Border
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.roundedRect(15, 50, 180, 35, 3, 3, 'S');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    
    // Left column
    doc.text('Order Number:', 20, 60);
    doc.text('Order Date:', 20, 68);
    doc.text('Status:', 20, 76);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(order.id || 'N/A', 55, 60);
    doc.text(order.date || 'N/A', 55, 68);
    
    // Status with color
    const statusColors = {
      'Delivered': [16, 185, 129],
      'Shipped': [59, 130, 246],
      'Cancelled': [239, 68, 68],
      'Processing': [245, 158, 11]
    };
    
    const statusColor = statusColors[order.status] || [100, 100, 100];
    doc.setTextColor(...statusColor);
    doc.setFont('helvetica', 'bold');
    doc.text(order.status || 'N/A', 55, 76);
    
    // Right column
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    
    if (order.trackingNumber) {
      doc.text('Tracking Number:', 110, 60);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(order.trackingNumber, 155, 60);
    }
    
    if (order.estimatedDelivery) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(80, 80, 80);
      doc.text('Est. Delivery:', 110, 68);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(order.estimatedDelivery, 155, 68);
    } else if (order.deliveredDate) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(80, 80, 80);
      doc.text('Delivered On:', 110, 68);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(order.deliveredDate, 155, 68);
    }
    
    // ============================================
    // ITEMS TABLE TITLE
    // ============================================
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Order Items', 15, 100);
    
    // ============================================
    // ITEMS TABLE
    // ============================================
    const tableData = order.items.map(item => [
      item.name || 'N/A',
      item.size || 'N/A',
      item.color || 'N/A',
      item.qty?.toString() || '0',
      `${parseFloat(item.price || 0).toFixed(2)} LE`,
      `${parseFloat((item.price || 0) * (item.qty || 0)).toFixed(2)} LE`
    ]);
    
    doc.autoTable({
      startY: 106,
      head: [['Product Name', 'Size', 'Color', 'Qty', 'Price', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
        halign: 'center',
        cellPadding: 5
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [50, 50, 50],
        cellPadding: 4
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250]
      },
      columnStyles: {
        0: { cellWidth: 65, halign: 'left' },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 15, halign: 'center' },
        4: { cellWidth: 30, halign: 'right' },
        5: { cellWidth: 30, halign: 'right' }
      },
      margin: { left: 15, right: 15 }
    });
    
    // ============================================
    // SUMMARY BOX
    // ============================================
    const finalY = doc.lastAutoTable.finalY + 15;
    const summaryX = 110;
    const summaryWidth = 85;
    
    // Background
    doc.setFillColor(248, 248, 248);
    doc.roundedRect(summaryX, finalY, summaryWidth, 45, 3, 3, 'F');
    
    // Border
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.roundedRect(summaryX, finalY, summaryWidth, 45, 3, 3, 'S');
    
    // Calculate totals
    const subtotal = order.items.reduce((sum, item) => 
      sum + (parseFloat(item.price || 0) * parseInt(item.qty || 0)), 0
    );
    const shipping = 50.00;
    const tax = subtotal * 0.14;
    const total = order.total || (subtotal + shipping + tax);
    
    let currentY = finalY + 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    
    // Subtotal
    doc.text('Subtotal:', summaryX + 8, currentY);
    doc.text(`${subtotal.toFixed(2)} LE`, summaryX + summaryWidth - 8, currentY, { align: 'right' });
    
    currentY += 8;
    
    // Shipping
    doc.text('Shipping:', summaryX + 8, currentY);
    doc.text(`${shipping.toFixed(2)} LE`, summaryX + summaryWidth - 8, currentY, { align: 'right' });
    
    currentY += 8;
    
    // Tax
    doc.text('Tax (14%):', summaryX + 8, currentY);
    doc.text(`${tax.toFixed(2)} LE`, summaryX + summaryWidth - 8, currentY, { align: 'right' });
    
    // Divider line
    currentY += 4;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(summaryX + 8, currentY, summaryX + summaryWidth - 8, currentY);
    
    currentY += 8;
    
    // Total
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('TOTAL:', summaryX + 8, currentY);
    
    doc.setTextColor(...accentColor);
    doc.text(`${parseFloat(total).toFixed(2)} LE`, summaryX + summaryWidth - 8, currentY, { align: 'right' });
    
    // ============================================
    // FOOTER
    // ============================================
    const footerY = 270;
    
    // Divider line
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(15, footerY, 195, footerY);
    
    // Footer text
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    
    doc.text('RYYZ Store - Your Premium Fashion Destination', 105, footerY + 8, { align: 'center' });
    doc.text('Email: support@ryyzstore.com | Phone: 01118801218', 105, footerY + 14, { align: 'center' });
    
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(...accentColor);
    doc.text('Thank you for shopping with us!', 105, footerY + 20, { align: 'center' });
    
    // ============================================
    // SAVE PDF
    // ============================================
    const fileName = `RYYZ_Invoice_${order.id.replace('#', '').replace(/\s/g, '_')}.pdf`;
    console.log('✅ PDF Generated Successfully:', fileName);
    doc.save(fileName);
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    alert('Error generating PDF. Please check console for details.');
  }
};