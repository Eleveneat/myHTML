import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
define("port", default=8888, help="run on the given port", type=int)

class Info(object):
    def __init__(self, full_name, publish_year, grade, reviews_number):
        self.full_name = full_name
        self.publish_year = publish_year
        self.grade = grade
        self.reviews_number= reviews_number
    def getDirFileMessage(self, path):
        fs = open(path, "r")
        self.full_name = fs.readline()
        self.publish_year = fs.readline()
        self.grade = fs.readline()
        self.reviews_number = fs.readline()
        fs.close()

class GeneralOverview(object):
    def __init__(self, overview_tittles_list, overview_details_list):
        self.overview_tittles_list = overview_tittles_list
        self.overview_details_list = overview_details_list
    def getDirFileMessage(self, path):


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        #initialization
        full_name = self.get_argument("full_name", None)
        publish_year = self.get_argument("publish_year", None)
        grade = self.get_argument("grade", None)
        reviews_number = self.get_argument("reviews_number", None)
        rotten_or_fresh = self.get_argument("rotten_or_fresh", None)
        overview_tittles_list = self.get_argument("overview_tittles_list", None)
        overview_details_list = self.get_argument("overview_details_list", None)

        asked_film_name = self.get_argument("film")
        picture_path = asked_film_name + "/" + "generaloverview.png"


        info = Info(full_name, publish_year, grade, reviews_number)
        info_path = "static/moviefiles/" + asked_film_name + "/info.txt"
        info.getDirFileMessage(info_path)

        if int(info.grade) >= 60:
            rotten_or_fresh = "freshbig.png"
        else:
            rotten_or_fresh = "rottenbig.png"

        generalOverview = GeneralOverview(overview_tittles_list, overview_details_list)
        generalOverview_path = "static/moviefiles/" + asked_film_name + "/generaloverview.txt"
        generalOverview.getDirFileMessage(generalOverview_path)

        self.render("movie.html", film_picture_path = picture_path,\
            film_name = info.full_name, film_publish_year = info.publish_year, film_grade = info.grade, film_reviews_number = info.reviews_number,\
            film_rotten_or_fresh = rotten_or_fresh,\
            film_overview_tittles_list = overview_tittles_list, film_overview_details_list = overview_details_list)


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