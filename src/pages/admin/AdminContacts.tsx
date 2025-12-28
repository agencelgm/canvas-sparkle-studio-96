import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Mail, Phone, Calendar } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  created_at: string;
}

const AdminContacts = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching contacts:", error);
      } else {
        setContacts(data || []);
      }
      setLoading(false);
    };

    fetchContacts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-8">Messages de contact</h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Aucun message de contact reçu.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact List */}
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`bg-card border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{contact.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(contact.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{contact.email}</p>
                  {contact.service && (
                    <span className="inline-block mt-2 px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                      {contact.service}
                    </span>
                  )}
                  <p className="text-sm text-foreground mt-2 line-clamp-2">{contact.message}</p>
                </div>
              ))}
            </div>

            {/* Contact Detail */}
            {selectedContact ? (
              <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-8">
                <h2 className="text-xl font-bold text-foreground mb-4">{selectedContact.name}</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${selectedContact.email}`} className="hover:text-primary">
                      {selectedContact.email}
                    </a>
                  </div>
                  
                  {selectedContact.phone && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${selectedContact.phone}`} className="hover:text-primary">
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedContact.created_at)}</span>
                  </div>
                </div>

                {selectedContact.service && (
                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground">Service demandé:</span>
                    <p className="font-medium text-foreground">{selectedContact.service}</p>
                  </div>
                )}

                <div>
                  <span className="text-sm text-muted-foreground">Message:</span>
                  <p className="text-foreground mt-1 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-6 flex items-center justify-center text-muted-foreground h-64">
                Sélectionnez un message pour voir les détails
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminContacts;
