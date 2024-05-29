package websocket

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID   uuid
	Conn *websocket.Conn
	Pool *Pool
}

type Message struct {
	ClientId uuid   `json:clientId`
	Type     int    `json:"type"`
	Body     string `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		message := Message{ClientId: c.ClientId, Type: messageType, Body: string(p)}
		c.Pool.Broadcast <- message
		fmt.Printf("Message Received: %+v\n", message)
	}
}
