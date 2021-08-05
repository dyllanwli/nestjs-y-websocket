/* eslint-env browser */

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'

Quill.register('modules/cursors', QuillCursors)

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()




  // to test on naive ws on nestjs uncomment code below then change an adapter on nest
  // const EventSocket = new WebSocket('ws://localhost:3000');
  // EventSocket.onopen = function() {
  //   console.log('Connected');
  //   EventSocket.send(
  //     JSON.stringify({
  //       event: 'events',
  //       data: 'test-events',
  //     }),
  //   );
  //   EventSocket.onmessage = function(data) {
  //     console.log(data);
  //   };
  // };
  // for regular connection
  const YjsSocket = new WebSocket('ws://localhost:8082/yjs');
  YjsSocket.onopen = function() {
    console.log('Nest Connected');
    YjsSocket.send(
      JSON.stringify({
        event: 'yjs',
        data: ydoc,
      }),
    );
    YjsSocket.onmessage = function(data) {
      console.log(data);
    };
  };

  const provider = new WebsocketProvider('ws://localhost:8082', 'yjs', ydoc)
  const ytext = ydoc.getText('quill')
  const editorContainer = document.createElement('div')
  editorContainer.setAttribute('id', 'editor')
  document.body.insertBefore(editorContainer, null)

  const editor = new Quill(editorContainer, {
    modules: {
      cursors: true,
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ],
      history: {
        userOnly: true
      }
    },
    placeholder: 'Start collaborating...',
    theme: 'snow' // or 'bubble'
  })

  const binding = new QuillBinding(ytext, editor, provider.awareness)

  /*
  // Define user name and user name
  // Check the quill-cursors package on how to change the way cursors are rendered
  provider.awareness.setLocalStateField('user', {
    name: 'Typing Jimmy',
    color: 'blue'
  })
  */

  const connectBtn = document.getElementById('y-connect-btn')
  connectBtn.addEventListener('click', () => {
    if (provider.shouldConnect) {
      provider.disconnect()
      connectBtn.textContent = 'Connect'
    } else {
      provider.connect()
      connectBtn.textContent = 'Disconnect'
    }
  })

  // @ts-ignore
  window.example = { provider, ydoc, ytext, binding, Y }
})