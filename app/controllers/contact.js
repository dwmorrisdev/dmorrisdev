import Ember from 'ember';

export default Ember.Controller.extend({
  guestName: '',
  guestEmail: '',
  guestMessage: '',

  isValidEmail: Ember.computed.match('guestEmail', /^.+@.+\..+$/),
  isValidMessage: Ember.computed.notEmpty('guestMessage'),
  isDisabled: Ember.computed('isValidEmail', 'isValidMessage', function() {
    if (this.get('isValidEmail') && this.get('isValidMessage')){
       return false;
     }else{
       return true;
    }
  }),

  actions: {
    saveMessage () {
      const name = this.get('guestName');
      const email = this.get('guestEmail');
      const mes = this.get('guestMessage');
      // console.log("inputs: " + name + email + mes);

      const newMessage = this.store.createRecord('contact', {
        name: name,
        email: email,
        message: mes
      });
      console.log(newMessage);

      newMessage.save().then( (res) => {
        this.set('responseMessage', `Thank you ${res.get('name')}, I just got your message!`);
        this.set('guestName', '');
        this.set('guestEmail', '');
        this.set('guestMessage', '');
      });
    },
    deleteMessage (){
      console.log("deleteMessage fired!");
      // remove the message item
    }
  }
});
