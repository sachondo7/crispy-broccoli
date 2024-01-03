import Router from 'koa-router';
import { CreateContact } from '../../app/services/contact/CreateContact';
import { GetContacts } from '../../app/services/contact/GetContacts';

const router = new Router();

type CreateContactRequestBody = {
  name: string;
  email: string;
  clientId: number;
};

router.post('/api/contacts', async (ctx) => {
  try {
    const requestBody = ctx.request.body as CreateContactRequestBody;
    if (!requestBody?.name || !requestBody?.email || !requestBody?.clientId) {
      ctx.status = 400; // Bad Request status code
      ctx.body = { error: 'Request body is missing required fields.' };
      return;
    }

    const createContact = new CreateContact();
    const newContact = await createContact.execute(
      requestBody.name,
      requestBody.email,
      requestBody.clientId
    );

    ctx.status = 201;
    ctx.body = newContact;

    console.log('Contact has been saved. Contact id is', newContact.id);
  } catch (error) {
    console.error('Error creating and saving contact:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while creating the contact.' };
  }
});

router.get('/api/contacts', async (ctx) => {
  try {
    const getAllContacts = new GetContacts();
    const contacts = await getAllContacts.execute();

    ctx.status = 200;
    ctx.body = contacts;
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while retrieving contacts.' };
  }
});

module.exports = router;
