import lang from 'dojo/_base/lang';
import AppStore from 'babel/store/AppStore';
import Helper from 'babel/utils/helper/Helper';

export default class addAppItemAttatchments {

  constructor() {

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.changeAttachments = this.changeAttachments.bind(this);
    this.uploadAttachment = this.uploadAttachment.bind(this);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    this.appItemAttatchments = [];
    this.prevIds = [];
  }

  updateAppState() {
    this.appState = AppStore.getState();
    const appItemAttatchments = lang.getObject('appState.builder.appItemAttatchments',false,this);

    if (appItemAttatchments && JSON.stringify(appItemAttatchments) !== JSON.stringify(this.appItemAttatchments)) {
      this.changeAttachments();
    }
  }

  changeAttachments() {
    this.appItemAttatchments = lang.getObject('appState.builder.appItemAttatchments',false,this);
    const ids = this.appItemAttatchments.map((current) => {
      return current.id;
    });
    const adds = ids.reduce((prev,current) => {
      if (this.prevIds.indexOf(current) < 0) {
        return prev.concat(current);
      }
      return prev;
    },[]);
    // const removes = this.prevIds.reduce((prev,current) => {
    //   if (ids.indexOf(current) < 0) {
    //     return prev.concat(current);
    //   }
    //   return prev;
    // },[]);

    this.prevIds = ids;

    adds.forEach((current) => {
      const attachmentData = this.appItemAttatchments.filter((fC) => {
        return fC.id === current;
      })[0];

      this.uploadAttachment(attachmentData);
    });

  }

  uploadAttachment(data) {
    const portal = lang.getObject('appState.app.portal',false,this);
    let filename;
    let attachment;

    switch (data.type) {
      case 'photo':
        filename = data.id + data.attachment.ext;
        attachment = Helper.attachmentUtils.dataURItoBlob(data.attachment.source);
        break;
    }

    portal.uploadAppItemAttachments({
      attachment,
      filename
    }).then((url) => {
      if (data.removeAttachments) {
        portal.removeAttachments({
          keep: filename,
          filter: data.removeFilter
        });
      }
      if (typeof data.callback === 'function') {
        data.callback(url);
      }
    });
  }

}
