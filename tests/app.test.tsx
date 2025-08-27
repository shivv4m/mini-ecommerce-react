
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../src/app/store'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'

test('renders homepage without crashing', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Provider>
  )
  expect(screen.getByText(/MiniStore/i)).toBeInTheDocument()
})
