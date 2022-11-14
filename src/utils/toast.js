import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export default function toast(props) {
  const { type, text } = props;
  toastEventManager.emit('addtoast', { type, text });
}
