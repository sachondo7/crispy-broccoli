import ExcelJS from 'exceljs';

export class MakeWorkbook {
  execute(groupedQuotes: Record<string, number>) {
    type QuoteGroup = {
      status: string;
      total: number;
    };

    const data: QuoteGroup[] = Object.keys(groupedQuotes).map((status) => ({
      status,
      total: groupedQuotes[status]
    }));

    const totalSum = data.reduce((acc, fila) => acc + fila.total, 0);

    const columns = [
      { key: 'status', header: 'Estado' },
      { key: 'total', header: 'Total' }
    ];

    // Crear un libro de Excel
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Reporte');

    // Llenar el libro de Excel con los datos
    sheet.columns = columns;
    data.forEach((fila) => {
      sheet.addRow(fila);
    });
    sheet.addRow({ status: '', total: totalSum });

    return workbook;
  }
}
