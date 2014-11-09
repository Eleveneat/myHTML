import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
define("port", default=8888, help="run on the given port", type=int)

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        tl = "Music Viewer"
        h1 = "190M Music Playlist Viewer"
        h2 = "Search Through Your Playlists and Music"
        playlist_be_asked = self.get_argument("playlist", "None")
        if (playlist_be_asked != "None"):
            print '222'
            path = "static/songs/" + playlist_be_asked
            f = open(path)
            songs_of_playlist = f.readlines()
            self.render("music.html", title = tl, header1 = h1, header2 = h2, songs = songs_of_playlist, playlists = [])
            f.close()
        else:
            all_songs = ["Be More.mp3", "Drift Away.mp3", "Hello.mp3", "Panda Sneeze.mp3"]
            all_lists = ["mypicks.txt", "playlist.txt"]
            print '111'
            self.render("music.html", title = tl, header1 = h1, header2 = h2, songs = all_songs, playlists = all_lists)
            print '333'




application = tornado.web.Application(
    [(r"/", MainHandler)],
    static_path = os.path.join(os.path.dirname(__file__), "static"),
    template_path = os.path.join(os.path.dirname(__file__), "templates"),
    debug = True
)

if __name__ == "__main__":
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()




