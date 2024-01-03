import Router from 'koa-router';
import ExcelJS from 'exceljs';
import { GetQuotes } from '../../app/services/quote/GetQuotes';

const router = new Router();

router.get('/api/getReport', async (ctx) => {
  try {
    const getAllQuotes = new GetQuotes();
    const quotes = await getAllQuotes.execute();

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Reporte');

    const columns = [
      { key: 'idProyecto', header: 'Nombre Proyecto' },
      { key: 'responsable', header: 'Responsable' },
      { key: 'cliente', header: 'Cliente' },
      { key: 'status', header: 'Estado' },
      { key: 'montoTotal', header: 'Monto total' }
    ];

    sheet.columns = columns;

    quotes.map(quote => ({
      idProyecto: quote.idProyecto,
      responsable: quote.userId.name,
      cliente: quote.clientId.name,
      status: quote.status,
      montoTotal: quote.tariffId.priceWhitDeduction + ' ' + quote.tariffId.currency
    })).forEach(fila => sheet.addRow(fila));

    ctx.attachment('reporte.xlsx');
    ctx.set(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    ctx.body = await workbook.xlsx.writeBuffer();
  } catch {
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while generating the report.' };
  }
});

module.exports = router;
