import { AppRegistry } from 'react-native'
import App from 'components';


AppRegistry.registerComponent('web', () => App)
AppRegistry.runApplication('web', {
  rootTag: document.getElementById('root'),
})
