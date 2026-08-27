import { useEffect, useMemo, useState } from "react";

const emptyForm = {
  title: "",
  requester: "",
  category: "Access",
  priority: "MEDIUM"
};

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    try {
      setLoading(true);
      const response = await fetch("/api/tickets");
      if (!response.ok) throw new Error("Unable to load requests");
      setTickets(await response.json());
      setError("");
    } catch (exception) {
      setError(exception.message);
    } finally {
      setLoading(false);
    }
  }

  async function createTicket(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error("Unable to create request");
      const createdTicket = await response.json();
      setTickets((current) => [createdTicket, ...current]);
      setForm(emptyForm);
      setError("");
    } catch (exception) {
      setError(exception.message);
    }
  }

  async function updateStatus(id, status) {
    try {
      const response = await fetch(`/api/tickets/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error("Unable to update status");
      const updatedTicket = await response.json();
      setTickets((current) => current.map((ticket) => ticket.id === id ? updatedTicket : ticket));
      setError("");
    } catch (exception) {
      setError(exception.message);
    }
  }

  const filteredTickets = useMemo(() => {
    const query = search.toLowerCase();
    return tickets.filter((ticket) => {
      const matchesStatus = statusFilter === "ALL" || ticket.status === statusFilter;
      const matchesSearch = ticket.title.toLowerCase().includes(query) || ticket.requester.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [tickets, statusFilter, search]);

  const counts = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "OPEN").length,
    progress: tickets.filter((ticket) => ticket.status === "IN_PROGRESS").length,
    resolved: tickets.filter((ticket) => ticket.status === "RESOLVED").length
  }), [tickets]);

  function handleInput(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className="application">
      <header>
        <div className="brand"><span>R</span><strong>RequestFlow</strong></div>
        <div className="user"><strong>Sushmita Payal</strong><small>Support Engineer</small></div>
      </header>

      <main>
        <section className="heading">
          <p className="eyebrow">Service request management</p>
          <h1>Keep every request moving.</h1>
          <p>Create, track, and resolve employee support requests from one simple workspace.</p>
        </section>

        {error && <div className="error">{error}</div>}

        <section className="statistics">
          <StatCard label="Total requests" value={counts.total} tone="blue" />
          <StatCard label="Open" value={counts.open} tone="amber" />
          <StatCard label="In progress" value={counts.progress} tone="violet" />
          <StatCard label="Resolved" value={counts.resolved} tone="green" />
        </section>

        <section className="layout">
          <form className="ticket-form" onSubmit={createTicket}>
            <div><p className="section-label">New request</p><h2>Create request</h2></div>
            <label>Request title<input name="title" value={form.title} onChange={handleInput} required placeholder="Describe the issue" /></label>
            <label>Requester<input name="requester" value={form.requester} onChange={handleInput} required placeholder="Employee name" /></label>
            <label>Category<select name="category" value={form.category} onChange={handleInput}><option>Access</option><option>Account</option><option>Billing</option><option>Data</option></select></label>
            <label>Priority<select name="priority" value={form.priority} onChange={handleInput}><option value="LOW">Low</option><option value="MEDIUM">Medium</option><option value="HIGH">High</option></select></label>
            <button type="submit">Create request</button>
          </form>

          <section className="ticket-panel">
            <div className="toolbar">
              <div><p className="section-label">Support queue</p><h2>All requests</h2></div>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search requests" aria-label="Search requests" />
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by status"><option value="ALL">All statuses</option><option value="OPEN">Open</option><option value="IN_PROGRESS">In progress</option><option value="RESOLVED">Resolved</option></select>
            </div>

            {loading ? <div className="empty">Loading requests...</div> : (
              <div className="table-wrapper">
                <table>
                  <thead><tr><th>Request</th><th>Requester</th><th>Priority</th><th>Status</th></tr></thead>
                  <tbody>{filteredTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td><small>#{ticket.id} · {ticket.category}</small><strong>{ticket.title}</strong></td>
                      <td>{ticket.requester}</td>
                      <td><span className={`priority ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span></td>
                      <td><select className={`status ${ticket.status.toLowerCase()}`} value={ticket.status} onChange={(event) => updateStatus(ticket.id, event.target.value)}><option value="OPEN">Open</option><option value="IN_PROGRESS">In progress</option><option value="RESOLVED">Resolved</option></select></td>
                    </tr>
                  ))}</tbody>
                </table>
                {filteredTickets.length === 0 && <div className="empty">No matching requests found.</div>}
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, tone }) {
  return <article className="stat-card"><span className={`dot ${tone}`} /><div><small>{label}</small><strong>{value}</strong></div></article>;
}
