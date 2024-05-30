package websocket

import (
	"fmt"
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:

			pool.Clients[client] = true
			thisClient := client.ID
			fmt.Println("Size of the connection pool: ", len(pool.Clients))
			for client := range pool.Clients {
				data := Message{ClientId: thisClient.String(), Type: 1, Body: "New user joined..."}
				fmt.Println("Client: ", data.ClientId)
				client.Conn.WriteJSON(data)
			}

		case client := <-pool.Unregister:
			thisClient := client.ID
			delete(pool.Clients, client)
			fmt.Println("Size of connection pool: ", len(pool.Clients))
			for client := range pool.Clients {
				client.Conn.WriteJSON(Message{ClientId: thisClient.String(), Type: 1, Body: "User disconnected..."})
			}
		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all clients in pool")
			for client := range pool.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
		}

	}
}
