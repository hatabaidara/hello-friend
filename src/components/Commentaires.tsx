import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  liked: boolean;
}

const Commentaires = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Marie Diop",
      content: "Excellent travail ! La tournée nationale a vraiment aidé notre communauté. Continuez comme ça !",
      date: "Il y a 2 jours",
      likes: 24,
      liked: false,
    },
    {
      id: 2,
      author: "Ibrahim Ba",
      content: "Les formations professionnelles sont une excellente initiative. J'ai personnellement bénéficié du programme numérique.",
      date: "Il y a 1 semaine",
      likes: 18,
      liked: false,
    },
    {
      id: 3,
      author: "Fatou Ndiaye",
      content: "La caravane santé a été bénéfique pour notre village. Plusieurs personnes ont pu consulter gratuitement.",
      date: "Il y a 2 semaines",
      likes: 32,
      liked: false,
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            liked: !comment.liked
          }
        : comment
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && authorName.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: authorName,
        content: newComment,
        date: "À l'instant",
        likes: 0,
        liked: false,
      };
      setComments([comment, ...comments]);
      setNewComment("");
      setAuthorName("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <MessageCircle className="h-6 w-6" />
              Commentaires des citoyens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Partagez votre avis sur les actions politiques..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Publier mon commentaire
              </Button>
            </form>

            <div className="space-y-4">
              {comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{comment.author}</h4>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="h-3 w-3" />
                              {comment.date}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{comment.content}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(comment.id)}
                        className={`flex items-center gap-2 ${comment.liked ? 'text-blue-600' : 'text-gray-500'}`}
                      >
                        <ThumbsUp className={`h-4 w-4 ${comment.liked ? 'fill-current' : ''}`} />
                        {comment.likes}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Commentaires;
