function myShepherd() {

  var shepherd;
    
  shepherd = new Shepherd.Tour({
    defaults: {
      classes: 'shepherd-element shepherd-open shepherd-theme-arrows',
      showCancelLink: true
    }
  });
  
  shepherd.addStep('welcome', {
    text: ['Welcome to your ColonialWebb Building Controls System.', 'We\'ll show you around and explain some important elements and features.', 'Press "Next" to advance, or "Exit" to skip the tutorial.', '(Hint: This system works best in the Chrome browser. <a href="https://www.google.com/intl/en/chrome/browser/" target="_blank">Click here to get it!</a>)'],
    title: ['Hello!'],
    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: [
      {
        text: 'Exit',
        classes: 'shepherd-button-secondary',
        action: shepherd.cancel
      }, {
        text: 'Next',
        action: shepherd.next,
        classes: 'shepherd-button-example-primary'
      }
    ]
  });

  shepherd.addStep('top', {
    text: ['At the top of your screen you will find a link to the home page, and the Action Center'],
    title: ['Top Bar'],
    attachTo: '#top-nav bottom',
    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: [
      {
        text: 'Back',
        classes: 'shepherd-button-secondary',
        action: shepherd.back
      }, {
        text: 'Next',
        action: shepherd.next,
        classes: 'shepherd-button-example-primary'
      }
    ]
  });
  
  shepherd.addStep('action', {
    text: ['The action center is where you can find helpful system information.', 'The number of open alarms is shown, and a dropdown list displays recent alarms and a link to the Alarm Console.', 'You can try this now.', 'Dropping down the user menu reveals some more advanced settings.'],
    title: ['Action Center'],
    attachTo: '#top-nav bottom',
    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: [
      {
        text: 'Back',
        classes: 'shepherd-button-secondary',
        action: shepherd.back
      }, {
        text: 'Next',
        action: shepherd.next,
        classes: 'shepherd-button-example-primary'
      }
    ],
  });
  
  shepherd.addStep('sidebar', {
    text: ['The sidebar is the easiest way to navigate the system.', 'The Components dropdown contains all the equipment on the system.', 'Schedules, Histories, and the Alarm Console can also be found here.'],
    title: ['Sidebar'],
    attachTo: '.nav-sidebar left',
    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: [
      {
        text: 'Back',
        classes: 'shepherd-button-secondary',
        action: shepherd.back
      }, {
        text: 'Next',
        action: shepherd.next
      }
    ]
  });

  shepherd.addStep('content', {
    text: ['All the views and graphics presented by the system will appear here.', 'This includes unit and component views, histories, schedules, the Alarm Console, and other settings'],
    title: ['Content Pane'],
    attachTo: '#main-container top',
    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: [
      {
        text: 'Back',
        classes: 'shepherd-button-secondary',
        action: shepherd.back
      }, {
        text: 'Next',
        action: shepherd.next
      }
    ]
  });
  
  shepherd.addStep('logout', {
    text: ['Don\'t forget to Log Out when you\'re done.'],
    attachTo: '.nav-sidebar right',
    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: [
      {
        text: 'Back',
        classes: 'shepherd-button-secondary',
        action: shepherd.back
      }, {
        text: 'Next',
        action: shepherd.next
      }
    ]
  });
  
  shepherd.addStep('thanks', {
    text: ['The tutorial will now exit.', 'To replay at any time, drop down the user menu and select Tutorial.'],
    title: ['Thanks!'],
    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: [
      {
        text: 'Back',
        classes: 'shepherd-button-secondary',
        action: shepherd.back
      }, {
        text: 'Done',
        action: shepherd.complete
      }
    ]
  });
  
  shepherd.start();
};