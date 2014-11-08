import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
    	tl = "Music Viewer"
    	h1 = "190M Music Playlist Viewer"
    	h2 = "Search Through Your Playlists and Music"
    	all_songs = ["Be More.mp3", "Drift Away.mp3", "Hello.mp3", "Panda Sneeze.mp3"]
    	all_lists = ["mypicks.txt", "playlist.txt"]
        self.render("music.html", title = tl, header1 = h1, header2 = h2, songs = all_songs, playlists = all_lists)

application = tornado.web.Application([
    (r"/", MainHandler),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()