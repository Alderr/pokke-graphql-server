const phoneNumberCheck = str => /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(str);

const createContactsArr = contacts => contacts.map((contact) => {
  if (contact.includes('@')) {
    return { email: contact };
  } else if (phoneNumberCheck(contact)) {
    return { phoneNumber: contact };
  }

  throw new Error('Not a valid contact!');
});


module.exports = {
  phoneNumberCheck,
  createContactsArr,
};
