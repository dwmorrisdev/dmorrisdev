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
    sendMessage () {
      const name = this.get('guestName');
      const email = this.get('guestEmail');
      const mes = this.get('guestMessage');

      const newMessage = this.store.createRecord('message', {
        name: name,
        email: email,
        message: mes
      });

      newMessage.save().then((responseMessage) => {
        this.set('responseMessage', `Thank you, I just got your message!`);
        this.set('guestName', '');
        this.set('guestEmail', '');
        this.set('guestMessage', '');
      });
    }
  }
});
