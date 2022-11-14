import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export default function toast(props) {
  const { type, text, duration } = props;
  toastEventManager.emit('addtoast', { type, text, duration });
}
