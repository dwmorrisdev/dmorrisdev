import Ember from 'ember';

export default Ember.Controller.extend({
  guestName: '',
  guestEmail: '',
  guestMessage: '',

  isValidEmail: Ember.computed.match('guestEmail', /^.+@.+\..+$/),
  //isValidName: Ember.computed.gte(guestName.length, 3),
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
      this.set('responseMessage', `Thank you, ${this.get('guestName')}! I just got your message!`);
      this.set('guestName', '');
      this.set('guestEmail', '');
      this.set('guestMessage', '');
    }
  }
});
